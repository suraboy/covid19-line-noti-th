'use strict';
const {getLasted} = require("../src/services/lottery/lasted-case");
const {pushLineNotification} = require("../src/utils/line-notification");
const moment = require('moment');
const {sysConfig} = require("../config/config");
const LineToken = sysConfig.lineNotify.lottery_token

module.exports.lotteryTodayCaseNotification = async () => {
    const response = await getLasted()

    if (response.status === 200) {
        const dateNow = Number(new Date().getDate())
        const dateLottery = Number(response.response.date.split(' ')[0])
        if(dateNow === dateLottery){
            const params = {
                message: '\r\n' + 'วันที่' + response.response.date + ' ' + '\r\n' +
                    response.response.prizes[0].name + '\r\n' +
                    response.response.prizes[0].number.join(' ') + '\r\n\r\n' +
                    response.response.prizes[1].name + '\r\n' +
                    response.response.prizes[1].number.join(' , ') + '\r\n\r\n' +
                    response.response.prizes[2].name + '\r\n' +
                    response.response.prizes[2].number.join(' , ') + '\r\n\r\n' +
                    response.response.prizes[3].name + '\r\n' +
                    response.response.prizes[3].number.join(' , ') + '\r\n\r\n' +
                    response.response.runningNumbers[0].name + '\r\n' +
                    response.response.runningNumbers[0].number.join(' , ') + '\r\n\r\n' +
                    response.response.runningNumbers[1].name + '\r\n' +
                    response.response.runningNumbers[1].number.join(' , ') + '\r\n\r\n' +
                    response.response.runningNumbers[2].name + '\r\n' +
                    response.response.runningNumbers[2].number.join(' , ') + '\r\n\r\n' +
                    'ท่านแม่ตรวจผลรางวัลได้ที่ :' + '\r\n' +
                    'https://www.thairath.co.th/lottery'
            }
            await pushLineNotification(params, LineToken);
        }
    }

    return response;
}