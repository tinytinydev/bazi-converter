## Classes

<dl>
<dt><a href="#BaziConverter">BaziConverter</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getEarthNumberFromHour">getEarthNumberFromHour(hour)</a></dt>
<dd><p>getEarthNumberFromHour To get the Earth Number (or DiziNumber) based on the hour provided</p>
</dd>
<dt><a href="#convertToTianGangNumber">convertToTianGangNumber(HNumber)</a> ⇒ <code>String</code></dt>
<dd><p>convertToTianGangNumber To indicate the number to be related to heavenly stem</p>
</dd>
<dt><a href="#convertToDiziNumber">convertToDiziNumber(ENumber)</a> ⇒ <code>String</code></dt>
<dd><p>convertToDiziNumber To indicate the number to be related to earthly branch</p>
</dd>
<dt><a href="#getBaziJson">getBaziJson()</a> ⇒ <code>JSON</code></dt>
<dd><p>getBaziJson To compute bazi result from provided parameters</p>
</dd>
<dt><a href="#getBaziChineseFullString">getBaziChineseFullString()</a> ⇒ <code>String</code></dt>
<dd><p>getBaziChineseFullString Format the bazi result in full, used for interpretation</p>
</dd>
<dt><a href="#getBaziEnglishMapping">getBaziEnglishMapping(baziChinese)</a> ⇒ <code>JSON</code></dt>
<dd><p>getBaziEnglishMapping Each pillar consist of 2 characters for the bazi in the format of heavenly stem + earthly stem</p>
</dd>
<dt><a href="#translateBaziEnglish">translateBaziEnglish()</a> ⇒ <code>JSON</code></dt>
<dd><p>translateBaziEnglish Translate the bazi results from Chinese to English</p>
</dd>
</dl>

<a name="BaziConverter"></a>

## BaziConverter
**Kind**: global class  
<a name="new_BaziConverter_new"></a>

### new BaziConverter(year, month, day, hour)

| Param | Type | Description |
| --- | --- | --- |
| year | <code>integer</code> | year of the date when the indivudal is born |
| month | <code>integer</code> | month of the date when the indivudal is born |
| day | <code>integer</code> | day of the date when the indivudal is born |
| hour | <code>integer</code> | hour of the individual is born |

<a name="getEarthNumberFromHour"></a>

## getEarthNumberFromHour(hour)
getEarthNumberFromHour To get the Earth Number (or DiziNumber) based on the hour provided

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| hour | <code>integer</code> | hour of the individual is born |

<a name="convertToTianGangNumber"></a>

## convertToTianGangNumber(HNumber) ⇒ <code>String</code>
convertToTianGangNumber To indicate the number to be related to heavenly stem

**Kind**: global function  
**Returns**: <code>String</code> - Returns TianGangNumber (or heavenly stem number)  

| Param | Type |
| --- | --- |
| HNumber | <code>integer</code> | 

<a name="convertToDiziNumber"></a>

## convertToDiziNumber(ENumber) ⇒ <code>String</code>
convertToDiziNumber To indicate the number to be related to earthly branch

**Kind**: global function  
**Returns**: <code>String</code> - Returns DiziNumber (or earthly branch number)  

| Param | Type |
| --- | --- |
| ENumber | <code>integer</code> | 

<a name="getBaziJson"></a>

## getBaziJson() ⇒ <code>JSON</code>
getBaziJson To compute bazi result from provided parameters

**Kind**: global function  
**Returns**: <code>JSON</code> - Returns bazi result related to the 4 pillars  
<a name="getBaziChineseFullString"></a>

## getBaziChineseFullString() ⇒ <code>String</code>
getBaziChineseFullString Format the bazi result in full, used for interpretation

**Kind**: global function  
**Returns**: <code>String</code> - Returns Bazi in full  
<a name="getBaziEnglishMapping"></a>

## getBaziEnglishMapping(baziChinese) ⇒ <code>JSON</code>
getBaziEnglishMapping Each pillar consist of 2 characters for the bazi in the format of heavenly stem + earthly stem

**Kind**: global function  
**Returns**: <code>JSON</code> - Returns the associated animal mnemonic, element and organ  

| Param | Description |
| --- | --- |
| baziChinese | A valid bazi (2 Chinese characters) from any of the 4 pillars |

<a name="translateBaziEnglish"></a>

## translateBaziEnglish() ⇒ <code>JSON</code>
translateBaziEnglish Translate the bazi results from Chinese to English

**Kind**: global function  
**Returns**: <code>JSON</code> - Returns bazi result related to the 4 pillars in English  
