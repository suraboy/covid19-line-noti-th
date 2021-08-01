'use strict';
const {getTodayCases} = require("../src/services/covid19/cronjobs/today-case");
const {pushLineNotification} = require("../src/utils/line-notification");

module.exports.covid19TodayCaseNotification = async () => {
    const response = await getTodayCases();

    if(response.status === 200){
        const params = {
            message: '\r\n' + `ผู้ติดเชื้อเพิ่มวันนี้: ` + response.response.NewConfirmed + '\r\n' +
            `ผู้ป่วยสะสม: ` + response.response.Confirmed + '\r\n' +
            `เสียชีวิตเพิ่มวันนี้: ` + response.response.Deaths + '\r\n'
                ,
        }
        await pushLineNotification(params);
    }

    return response;
}