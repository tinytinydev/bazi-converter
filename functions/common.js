import * as fs from 'fs';

export const loadRawData = (filePath) => {
    let rawdata = fs.readFileSync(filePath);
    return JSON.parse(rawdata);
};

export const loadRawDataToMap = (filePath) => {
    let jsonObj = loadRawData(filePath);
    return new Map(Object.entries(jsonObj));
}