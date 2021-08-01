const dotenv = require('dotenv').config();

module.exports.sysConfig = {
    services: {
        covid19_api: process.env.COVID19_API
    },
    lineNotify: {
        token: process.env.LINE_TOKEN
    }
}