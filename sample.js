import BaziConverter from "./BaziConverter.js";

// For normal calculation
let bazi = new BaziConverter(1993, 5, 10, 20);
console.log(bazi.getBaziJson());
console.log(bazi.translateBaziEnglish());
console.log(bazi.getBaziChineseFullString());

// For calculation where hour is not recognized
bazi = new BaziConverter(1993, 5, 10, -1);
console.log(bazi.getBaziJson());
console.log(bazi.translateBaziEnglish());
console.log(bazi.getBaziChineseFullString());
