'use strict';
const {getTodayCases} = require("../src/services/covid19/cronjobs/today-case");
const {pushLineNotification} = require("../src/utils/line-notification");
const moment = require('moment-timezone');

module.exports.covid19TodayCaseNotification = async () => {
    const response = await getTodayCases({},{'headers':{
            'api-key': 'unahTSe5GmOX2DvuKknMF0cbCSlhz1VM'
        }});

    if(response.status === 200){
        const params = {
            message: ' ('+ moment(response.response.updated).tz('Asia/Bangkok').format("DD/MM/YYYY") +')' + '\r\n' + `ผู้ติดเชื้อเพิ่มวันนี้: ` + response.response.todayCases + '\r\n' +
            `ผู้ป่วยสะสม: ` + response.response.cases + '\r\n' +
            `เสียชีวิต: ` + response.response.deaths + ' (+'+ response.response.todayDeaths + ')'+'\r\n'
        }
        await pushLineNotification(params);
    }

    return response;
}