const fs = require("fs");
const csv = require("fast-csv");
const iconv = require('iconv-lite');

module.exports.readCSV = async (dirFile, options = {}) => {
    return await new Promise((resolve, reject) => {
        let data = [];
        options.ignoreEmpty = true
        fs.createReadStream(dirFile)
            .pipe(iconv.decodeStream('TIS-620'))
            .pipe(csv.parse(options))
            .on('error', error => {
                reject(error)
            })
            .on('data', row => {
                data.push(row)
            })
            .on('end', () => {
                resolve(data)
            });
    });
}
