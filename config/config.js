const dotenv = require('dotenv').config();

module.exports.sysConfig = {
    services: {
        covid19_api: process.env.COVID19_API,
        lottery_api: process.env.THAI_LOTTERY_API,
    },
    lineNotify: {
        covid_token: process.env.COVID_LINE_TOKEN,
        lottery_token: process.env.LOTTERY_LINE_TOKEN,
        sawaddee_token: process.env.SAWADDEE_LINE_TOKEN,

    }
}