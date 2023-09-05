<h1 align="center">Bazi Converter</h1>

<h5 align="center">Simple Bazi Converter API in NodeJS</h5>

## Installation
`npm install bazi-converter`


## Using it
You can get a new Bazi result by initialising the BaziConverter with these params: Year, Month, Day, Hour of birth (in 24 hour format)
```
import BaziConverter from 'bazi-converter'

let bazi = new BaziConverter(1993,5,10,20);

# returns { year: '癸酉', month: '丁巳', day: '辛卯', time: '戊戌' }
console.log(bazi.getBaziJson())

# returns 癸酉年丁巳月辛卯日戊戌时
console.log(bazi.getBaziChineseFullString());

```

# References and Credits
The mappings in the data is scrapped from https://en.wikibooks.org/wiki/Ba_Zi/1991 - https://en.wikibooks.org/wiki/Ba_Zi/2033.

The hour mapping is scrapped from https://en.wikibooks.org/wiki/Ba_Zi/Hour_Pillar

This data allowed me to create a simple mapping and conversion logic for Bazi. It will not have been possible for me to create this package without their data.

# Contact
If you find any bugs or issues, please reach out to me on LinkedIn: https://www.linkedin.com/in/eugene-choy-wj/ 
