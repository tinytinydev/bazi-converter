import * as fs from 'fs';
import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let rawdata = fs.readFileSync(__dirname + '/data/dizi.json')
const $dizi = JSON.parse(rawdata);

rawdata = fs.readFileSync(__dirname + '/data/tiangan.json');
const $tiangang = JSON.parse(rawdata);

rawdata = fs.readFileSync(__dirname + '/data/dates_mapping.json');
const $dates_mapping = JSON.parse(rawdata);

rawdata = fs.readFileSync(__dirname + '/data/hour_mapping.json');
const $hour_mapping = JSON.parse(rawdata);

rawdata = fs.readFileSync(__dirname + '/data/earthly_branches_english.json');
const $earthly_branches_english_json = JSON.parse(rawdata);
const $earthly_branches_english_map = new Map(Object.entries($earthly_branches_english_json));

rawdata = fs.readFileSync(__dirname + '/data/heavenly_stems_english.json');
const $heavenly_stems_english_json = JSON.parse(rawdata);
const $heavenly_stems_english_map = new Map(Object.entries($heavenly_stems_english_json));

/**
 * @class BaziConverter
 * @param {integer} year - year of the date when the indivudal is born
 * @param {integer} month - month of the date when the indivudal is born
 * @param {integer} day - day of the date when the indivudal is born
 * @param {integer} hour - hour of the individual is born
 */
export default class BaziConverter{

    /**
     * Represents the eight characters of an individual
     * @constructor
     * @param {integer} year - year of the date when the indivudal is born
     * @param {integer} month - month of the date when the indivudal is born
     * @param {integer} day - day of the date when the indivudal is born
     * @param {integer} hour - hour of the individual is born
     */
    constructor(year,month,day,hour){
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
    }

    /**
     * getEarthNumberFromHour To get the Earth Number (or DiziNumber) based on the hour provided
     * @method
     * @param {integer} hour - hour of the individual is born
     */
    getEarthNumberFromHour(hour){
        if(hour >= 23 || (hour < 1)){
            return "E1"
        }
        else if (hour < 3){
            return "E2"
        }
        else if (hour < 5){
            return "E3"
        }
        else if (hour < 7){
            return "E4"
        }
        else if (hour < 9){
            return "E5"
        }
        else if (hour < 11){
            return "E6"
        }
        else if (hour < 13){
            return "E7"
        }
        else if (hour < 15){
            return "E8"
        }
        else if (hour < 17){
            return "E9"
        }
        else if (hour < 19){
            return "E10"
        }
        else if (hour < 21){
            return "E11"
        }
        else if (hour < 23){
            return "E12"
        }
    }


    /**
     * convertToTianGangNumber To indicate the number to be related to heavenly stem
     * @param {integer} HNumber
     * @returns {String} Returns TianGangNumber (or heavenly stem number)
     */
    convertToTianGangNumber(HNumber){
        return "H" + HNumber;
    }

    /**
     * convertToDiziNumber To indicate the number to be related to earthly branch
     * @param {integer} ENumber 
     * @returns {String} Returns DiziNumber (or earthly branch number)
     */
    convertToDiziNumber(ENumber){
        return "E" + ENumber;
    }

    /**
     * getBaziJson To compute bazi result from provided parameters
     * @returns {JSON} Returns bazi result related to the 4 pillars
     */
    getBaziJson(){
        const baziDate = $dates_mapping[this.year][this.month][this.day];
        const earthHour = this.getEarthNumberFromHour(this.hour);
        const hourMapping = $hour_mapping[earthHour][baziDate.HDay];

        const baziChineseYear = $tiangang[this.convertToTianGangNumber(baziDate.HYear)] + $dizi[this.convertToDiziNumber(baziDate.EYear)];

        const baziChineseMonth = $tiangang[this.convertToTianGangNumber(baziDate.HMonth)] + $dizi[this.convertToDiziNumber(baziDate.EMonth)];
        const baziChineseDay = $tiangang[this.convertToTianGangNumber(baziDate.HDay)] + $dizi[this.convertToDiziNumber(baziDate.EDay)];
        const baziChineseTime = $tiangang[hourMapping] + $dizi[earthHour];
        return {"year":baziChineseYear, "month":baziChineseMonth, "day":baziChineseDay, "time":baziChineseTime};
    }

    /**
     * getBaziChineseFullString Format the bazi result in full, used for interpretation
     * @returns {String} Returns Bazi in full 
     */
    getBaziChineseFullString(){
        let data = this.getBaziJson();
        return data.year + "年" + data.month + "月" +  data.day + "日"+ data.time + "时";
    }

    /**
     * getBaziEnglishMapping Each pillar consist of 2 characters for the bazi in the format of heavenly stem + earthly stem
     * @method
     * @param baziChinese A valid bazi (2 Chinese characters) from any of the 4 pillars
     * @returns {JSON} Returns the associated animal mnemonic, element and organ
     */
    getBaziEnglishMapping(baziChinese) {
        const baziChineseArr = baziChinese.split("");
        const heavenly_stem = baziChineseArr[0];
        const earthly_branch = baziChineseArr[1];

        const heavenly_stem_mapping = $heavenly_stems_english_map.get(heavenly_stem);
        const earthly_branch_mapping = $earthly_branches_english_map.get(earthly_branch);

        return {
            "element": heavenly_stem_mapping.element,
            "animal_mnemonic": earthly_branch_mapping.animal_mnemonic
        }
    }

    /**
     * translateBaziEnglish Translate the bazi results from Chinese to English
     * @returns {JSON} Returns bazi result related to the 4 pillars in English
     */
    translateBaziEnglish() {
        const baziJson = this.getBaziJson();
        const baziChineseYear = baziJson.year;
        const baziChineseMonth = baziJson.month;
        const baziChineseDay = baziJson.day;
        const baziChineseTime = baziJson.time;

        const baziChineseYearEnglish = this.getBaziEnglishMapping(baziChineseYear);
        const baziChineseMonthEnglish = this.getBaziEnglishMapping(baziChineseMonth);
        const baziChineseDayEnglish = this.getBaziEnglishMapping(baziChineseDay);
        const baziChineseTimeEnglish = this.getBaziEnglishMapping(baziChineseTime);
                        
        let englishMapping = {
            "year": `${baziChineseYearEnglish.element} ${baziChineseYearEnglish.animal_mnemonic}`,
            "month": `${baziChineseMonthEnglish.element} ${baziChineseMonthEnglish.animal_mnemonic}`,
            "day": `${baziChineseDayEnglish.element} ${baziChineseDayEnglish.animal_mnemonic}`,
            "time": `${baziChineseTimeEnglish.element} ${baziChineseTimeEnglish.animal_mnemonic}`
        }

        return englishMapping
    }
}
