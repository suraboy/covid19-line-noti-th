'use strict';
const {getTodayCases} = require("../src/services/covid19/cronjobs/today-case");
const {pushLineNotification} = require("../src/utils/line-notification");
const {sysConfig} = require("../config/config");
const LineToken = sysConfig.lineNotify.covid_token

module.exports.covid19TodayCaseNotification = async () => {
    const response = await getTodayCases({},{'headers':{
            'api-key': 'unahTSe5GmOX2DvuKknMF0cbCSlhz1VM'
        }});

    if(response.status === 200){
        const params = {
            message: ' ('+ response.response.UpdateDate +')' + '\r\n' + `ผู้ติดเชื้อเพิ่มวันนี้: ` + response.response.todayCases + '\r\n' +
            `ผู้ป่วยสะสม: ` + response.response.cases + '\r\n' +
            `เสียชีวิต: ` + response.response.deaths + ' (+'+ response.response.todayDeaths + ')'+'\r\n'
        }
        await pushLineNotification(params,LineToken);
    }

    return response;
}