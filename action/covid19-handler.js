'use strict';
const {getTodayCases, getSongkhlaTodayCases} = require("../src/services/covid19/cronjobs/today-case");
const {pushLineNotification} = require("../src/utils/line-notification");
const {sysConfig} = require("../config/config");
const LineToken = sysConfig.lineNotify.covid_token
const moment = require('moment');

module.exports.covid19TodayCaseNotification = async () => {
    const response = await getTodayCases({}, {
        'headers': {
            'Content-Type': 'application/json',
            'api-key': 'unahTSe5GmOX2DvuKknMF0cbCSlhz1VM'
        }
    });

    if (response.status === 200) {
        const params = {
            message: '\r\n' + 'ทั่วประเทศ (' + response.response.UpdateDate + ')' + '\r\n' + `ผู้ติดเชื้อเพิ่มวันนี้: ` + response.response.todayCases + '\r\n' +
                `ผู้ป่วยสะสม: ` + response.response.cases + '\r\n' +
                `เสียชีวิต: ` + response.response.deaths + ' (+' + response.response.todayDeaths + ')' + '\r\n'
        }
        await pushLineNotification(params, LineToken);
    }

    return response;
}

module.exports.covid19SongkhlaTodayCaseNotification = async () => {
    const response = await getSongkhlaTodayCases();

    if (response.status === 200) {
        const data = response.response.filter((item) => {
            return item.province === 'สงขลา';
        });

        const params = {
            message: '\r\n' + 'สงขลา (' + moment(data[0].txn_date).format('DD/MM/yyyy hh:mm') + ')' + '\r\n' + `ผู้ติดเชื้อเพิ่มวันนี้: ` + data[0].new_case + '\r\n' +
                `ผู้ป่วยสะสม: ` + data[0].total_case + '\r\n' +
                `เสียชีวิต: ` + data[0].total_death + ' (+' + data[0].new_death + ')' + '\r\n'
        }
        await pushLineNotification(params, LineToken);
    }

    return response;
}