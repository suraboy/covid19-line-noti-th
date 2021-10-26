'use strict';
const {getSymbols} = require("../src/services/cypto-currency/quotes");
const {pushLineNotification} = require("../src/utils/line-notification");
const {sysConfig} = require("../config/config");
const LineToken = sysConfig.lineNotify.covid_token

module.exports.CryptoCurrencyNotification = async () => {
    const response = await getSymbols({
        symbol: `${process.env.COIN_MARKET_SYMBOL}`,
        convert: 'THB'
    }, {
        'headers': {
            Accepts: 'application/json',
            "X-CMC_PRO_API_KEY": `${process.env.COIN_MARKET_TOKEN}`
        }
    });

    if (response.status === 200) {
        let message = ""
        for (const [key, value] of Object.entries(response.response.data)) {
            if (5 < value.quote['THB'].percent_change_24h || -5 > value.quote['THB'].percent_change_24h) {
                const money = (value.quote['THB'].price).toFixed(0);
                const percent = (value.quote['THB'].percent_change_24h).toFixed(2);
                message += [`${key}: ${money.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} (${percent}%)` + '\r\n']
            }
        }
        if (message !== '') {
            const params = {
                message: '\r\n' +
                    `ฉุกเฉิน : ` + '\r\n' + message
            }
            await pushLineNotification(params, LineToken);
        }
    }

    return response;
}

module.exports.CryptoCurrencyTodayNotification = async () => {
    const response = await getSymbols({
        symbol: `${process.env.COIN_MARKET_SYMBOL}`,
        convert: 'THB'
    }, {
        'headers': {
            Accepts: 'application/json',
            "X-CMC_PRO_API_KEY": `${process.env.COIN_MARKET_TOKEN}`
        }
    });

    if (response.status === 200) {
        let message = ""
        for (const [key, value] of Object.entries(response.response.data)) {
            const money = (value.quote['THB'].price).toFixed(0);
            const percent = (value.quote['THB'].percent_change_24h).toFixed(2);
            message += [`${key}: ${money.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} (${percent}%)` + '\r\n']
        }
        const params = {
            message: '\r\n' +
                `ราคาเหรียญ: ` + '\r\n' + message
        }
        await pushLineNotification(params, LineToken);
    }

    return response;
}