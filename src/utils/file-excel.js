const excelToJson = require('convert-excel-to-json');

module.exports.readExcel = async (filePath, tempSheetName, headerRows) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sheetName = (tempSheetName.length === 0) ? [tempSheetName] : tempSheetName;

            const result = excelToJson({
                sourceFile: filePath,
                header: {
                    rows: headerRows
                },
                sheets: tempSheetName
            });

            let resultData = [];
            if (sheetName.length > 0) {
                sheetName.forEach(sheetNameItem => {
                    console.log(`Total record in Excel file: ${result[sheetNameItem].length} rows, FileName: ${filePath} - SheetName: ${sheetNameItem}`);
                    resultData = result[sheetNameItem];
                });
                
            } else {
                console.log(`Total record in Excel file: ${result[sheetName].length} rows, FileName: ${filePath} - SheetName: ${sheetName}`);
                resultData = result[sheetName];
            }

            resolve(resultData);
        } catch (error) {
            console.error("SYSTEM_ERROR", "Throws exception: error process read Excel file: ", error);
            reject(error);
        }
    });
}
