//Please use "import BaziConverter from 'bazi-converter'" instead for production
import BaziConverter from "./BaziConverter.js";

// For normal calculation
let bazi = new BaziConverter(1994, 5, 10, 21);
console.log("===NORMAL CASE===");
console.log(bazi.getBaziJson());

console.log(bazi.getBaziJsonWithElementalZodiac());
console.log(bazi.translateBaziEnglish());
console.log(bazi.getBaziChineseFullString());

// For calculation where hour is not recognized
bazi = new BaziConverter(1993, 5, 10, -1);
console.log("===NO HOUR CASE===");
console.log(bazi.getBaziJson());
console.log(bazi.translateBaziEnglish());
console.log(bazi.getBaziChineseFullString());
