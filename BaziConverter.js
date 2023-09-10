import { fileURLToPath } from "url";
import path from "path";
import { loadRawData, loadRawDataToMap } from "./functions/common.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//For ppl with no time
const $lucky_time = "Lucky";
const $lucky_time_chinese = "吉";

const $dizi = loadRawData(__dirname + "/data/dizi.json");
const $tiangang = loadRawData(__dirname + "/data/tiangan.json");
const $dates_mapping = loadRawData(__dirname + "/data/dates_mapping.json");
const $hour_mapping = loadRawData(__dirname + "/data/hour_mapping.json");
const $earthly_branches_english_map = loadRawDataToMap(
  __dirname + "/data/earthly_branches_english.json"
);
const $heavenly_stems_english_map = loadRawDataToMap(
  __dirname + "/data/heavenly_stems_english.json"
);
const $elements_mapping = loadRawDataToMap(
  __dirname + "/data/elements_mapping.json"
);
const $zodic_mapping = loadRawDataToMap(
  __dirname + "/data/zodiac_mapping.json"
);

/**
 * @class BaziConverter
 * @param {integer} year - year of the date when the indivudal is born
 * @param {integer} month - month of the date when the indivudal is born
 * @param {integer} day - day of the date when the indivudal is born
 * @param {integer} hour - hour of the individual is born
 */
export default class BaziConverter {
  /**
   * Represents the eight characters of an individual
   * @constructor
   * @param {integer} year - year of the date when the indivudal is born
   * @param {integer} month - month of the date when the indivudal is born
   * @param {integer} day - day of the date when the indivudal is born
   * @param {integer} hour - hour of the individual is born
   */
  constructor(year, month, day, hour) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
  }

  /**
   * getEarthNumberFromHour To get the Earth Number (or DiziNumber) based on the hour provided.
   * A "-"" will be returned if the hour value is not recognized.
   * @method
   * @param {integer} hour - hour of the individual is born
   */
  getEarthNumberFromHour(hour) {
    if (hour < 0) {
      return "-";
    }
    if (hour >= 23 || hour < 1) {
      return "E1";
    } else if (hour < 3) {
      return "E2";
    } else if (hour < 5) {
      return "E3";
    } else if (hour < 7) {
      return "E4";
    } else if (hour < 9) {
      return "E5";
    } else if (hour < 11) {
      return "E6";
    } else if (hour < 13) {
      return "E7";
    } else if (hour < 15) {
      return "E8";
    } else if (hour < 17) {
      return "E9";
    } else if (hour < 19) {
      return "E10";
    } else if (hour < 21) {
      return "E11";
    } else if (hour < 23) {
      return "E12";
    } else {
      return "-";
    }
  }
  /**
   * convertToTianGangNumber To indicate the number to be related to heavenly stem
   * @param {integer} HNumber
   * @returns {String} Returns TianGangNumber (or heavenly stem number)
   */
  convertToTianGangNumber(HNumber) {
    return "H" + HNumber;
  }

  /**
   * convertToDiziNumber To indicate the number to be related to earthly branch
   * @param {integer} ENumber
   * @returns {String} Returns DiziNumber (or earthly branch number)
   */
  convertToDiziNumber(ENumber) {
    return "E" + ENumber;
  }

  /**
   * getBaziJson To compute bazi result from provided parameters
   * @returns {JSON} Returns bazi result related to the 4 pillars
   */
  getBaziJson() {
    const baziDate = $dates_mapping[this.year][this.month][this.day];
    const earthHour = this.getEarthNumberFromHour(this.hour);
    let hourMapping = $lucky_time_chinese;

    if (earthHour !== "-") {
      hourMapping = $hour_mapping[earthHour][baziDate.HDay];
    }
  }

  /**
   * convertToTianGangNumber To indicate the number to be related to heavenly stem
   * @param {integer} HNumber
   * @returns {String} Returns TianGangNumber (or heavenly stem number)
   */
  convertToTianGangNumber(HNumber) {
    return "H" + HNumber;
  }

  /**
   * convertToDiziNumber To indicate the number to be related to earthly branch
   * @param {integer} ENumber
   * @returns {String} Returns DiziNumber (or earthly branch number)
   */
  convertToDiziNumber(ENumber) {
    return "E" + ENumber;
  }

  /**
   * getBaziJson To compute bazi result from provided parameters
   * @returns {JSON} Returns bazi result related to the 4 pillars
   */
  getBaziJson() {
    const baziDate = $dates_mapping[this.year][this.month][this.day];
    const earthHour = this.getEarthNumberFromHour(this.hour);
    let hourMapping = "吉";

    if (earthHour !== "-") {
      hourMapping = $hour_mapping[earthHour][baziDate.HDay];
    }

    const baziChineseYear =
      $tiangang[this.convertToTianGangNumber(baziDate.HYear)] +
      $dizi[this.convertToDiziNumber(baziDate.EYear)];

    const baziChineseMonth =
      $tiangang[this.convertToTianGangNumber(baziDate.HMonth)] +
      $dizi[this.convertToDiziNumber(baziDate.EMonth)];
    const baziChineseDay =
      $tiangang[this.convertToTianGangNumber(baziDate.HDay)] +
      $dizi[this.convertToDiziNumber(baziDate.EDay)];

    let baziChineseTime = hourMapping;
    if (earthHour !== "-") {
      baziChineseTime = $tiangang[hourMapping] + $dizi[earthHour];
    }
    return {
      year: baziChineseYear,
      month: baziChineseMonth,
      day: baziChineseDay,
      time: baziChineseTime,
    };
  }

  /**
   * getBaziChineseFullString Format the bazi result in full, used for interpretation
   * @returns {String} Returns Bazi in full
   */
  getBaziChineseFullString() {
    let data = this.getBaziJson();
    return (
      data.year + "年" + data.month + "月" + data.day + "日" + data.time + "时"
    );
  }

  /**
   * getBaziEnglishMapping Each pillar consist of 2 characters for the bazi in the format of heavenly stem + earthly stem
   * @method
   * @param baziChinese A valid bazi (2 Chinese characters) from any of the 4 pillars
   * @returns {JSON} Returns the associated animal mnemonic, element and organ
   */
  getBaziEnglishMapping(baziChinese) {
    const baziChineseArr = baziChinese.split("");

    if (baziChineseArr.length == 1) {
      return baziChinese; //If it is 1 word means it is a unknown time: 吉
    }
    const heavenly_stem = baziChineseArr[0];
    const earthly_branch = baziChineseArr[1];
    const heavenly_stem_mapping =
      $heavenly_stems_english_map.get(heavenly_stem);
    const earthly_branch_mapping =
      $earthly_branches_english_map.get(earthly_branch);

    return {
      element: heavenly_stem_mapping.element,
      animal_mnemonic: earthly_branch_mapping.animal_mnemonic,
    };
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
    const baziChineseMonthEnglish =
      this.getBaziEnglishMapping(baziChineseMonth);
    const baziChineseDayEnglish = this.getBaziEnglishMapping(baziChineseDay);

    let baziChineseTimeEnglish = {
      element: $lucky_time,
      animal_mnemonic: "",
    };
    if (baziChineseTime !== "吉") {
      baziChineseTimeEnglish = this.getBaziEnglishMapping(baziChineseTime);
    }

    let englishMapping = {
      year: `${baziChineseYearEnglish.element} ${baziChineseYearEnglish.animal_mnemonic}`,
      month: `${baziChineseMonthEnglish.element} ${baziChineseMonthEnglish.animal_mnemonic}`,
      day: `${baziChineseDayEnglish.element} ${baziChineseDayEnglish.animal_mnemonic}`,
      time: `${baziChineseTimeEnglish.element} ${baziChineseTimeEnglish.animal_mnemonic}`,
    };

    return englishMapping;
  }

  /**
   * getBaziEnglishMapping Each pillar consist of 2 characters for the bazi in the format of heavenly stem + earthly stem
   * @method
   * @param {String} baziChinese A valid bazi (2 Chinese characters) from any of the 4 pillars
   * @returns {JSON} Returns the associated animal mnemonic and element in English
   */
  getBaziEnglishMapping(baziChinese) {
    const baziChineseArr = baziChinese.split("");
    const heavenly_stem = baziChineseArr[0];
    const earthly_branch = baziChineseArr[1];

    const heavenly_stem_mapping =
      $heavenly_stems_english_map.get(heavenly_stem);
    const earthly_branch_mapping =
      $earthly_branches_english_map.get(earthly_branch);

    return {
      element: heavenly_stem_mapping.element,
      animal_mnemonic: earthly_branch_mapping.animal_mnemonic,
    };
  }

  /**
   * getElementalZodiacMappingChinese To get the element and zodiac that are commonly used
   * @method
   * @param {String} baziEnglish A valid bazi in English (Element + Animal Mnemonic) from any of the 4 pillars
   * @returns {String} Returns the associated animal mnemonic (or zodiac)and element in Chinese
   */
  getElementalZodiacMappingChinese(baziEnglish) {
    const baziEnglishArr = baziEnglish.split(" ");
    if (baziEnglishArr[0] === "Lucky") {
      return "NA";
    }
    const element = baziEnglishArr[0];
    const zodiac = baziEnglishArr[1];

    const chinese_element = $elements_mapping.get(element);
    const chinese_zodiac = $zodic_mapping.get(zodiac);

    return chinese_element + chinese_zodiac;
  }

  /**
   * getBaziJsonWithElementalZodiac To compute bazi result with commonly used terms i.e. element and zodiac (or animal mnemonic)
   * @method
   * @returns {JSON} Return the Bazi result with commonly used terms in Chinese
   */
  getBaziJsonWithElementalZodiac() {
    const baziJsonEnglish = this.translateBaziEnglish();

    const baziJsonEnglishYear = baziJsonEnglish.year;
    const baziJsonEnglishMonth = baziJsonEnglish.month;
    const baziJsonEnglishDay = baziJsonEnglish.day;
    const baziJsonEnglishTime = baziJsonEnglish.time;

    // EZ = Elemental Zodiac
    const baziYearEZ =
      this.getElementalZodiacMappingChinese(baziJsonEnglishYear);
    const baziMonthEZ =
      this.getElementalZodiacMappingChinese(baziJsonEnglishMonth);
    const baziDayEZ = this.getElementalZodiacMappingChinese(baziJsonEnglishDay);
    const baziTimeEZ =
      this.getElementalZodiacMappingChinese(baziJsonEnglishTime);

    let baziJson = this.getBaziJson();

    baziJson.elemental_zodiac = {
      year: baziYearEZ,
      month: baziMonthEZ,
      day: baziDayEZ,
      time: baziTimeEZ,
    };

    return baziJson;
  }
}
