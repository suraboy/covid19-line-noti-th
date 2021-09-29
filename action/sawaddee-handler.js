'use strict';
const {curlPost} = require("../src/utils/axios");
const {sysConfig} = require("../config/config");
const LineToken = sysConfig.lineNotify.sawaddee_token
const moment = require('moment-timezone');
const querystring = require('querystring');
const date = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thusday', 'friday', 'saturday'
]
module.exports.sawaddeeTodayNotification = async () => {

    const n = moment().tz('Asia/Bangkok').format('d')

    const config = {
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + LineToken
        }
    }

    const params = querystring.stringify({
        message: 'สวัสดีตอนเช้า',
        imageThumbnail: 'https://patzy-official-api.herokuapp.com/' + date[n] + '.jpg',
        imageFullsize: 'https://patzy-official-api.herokuapp.com/' + date[n] + '.jpg',
    })
    return await curlPost(
        'https://notify-api.line.me/api/notify',
        params,
        config);
}