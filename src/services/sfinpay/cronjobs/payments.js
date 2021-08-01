const {curlGet} = require("../../../utils/axios");
const {sysConfig} = require("../../../../config/config");
/*Setup default data*/
const endpointConfig = sysConfig.services;
const endpoint = `${endpointConfig.sfinpay_api}` + `cron/payments`;

module.exports.CronPaymentT2P = async (params, options) => {
    return await curlGet(`${endpoint}` + '/t2p', params, options);
}

module.exports.CronPaymentCCPP = async (params, options) => {
    return await curlGet(`${endpoint}` + '/ccpp', params, options);
}

module.exports.CancelExpire = async (params, options) => {
    return await curlGet(`${endpoint}` + '/cancelexpire', params, options);
}

module.exports.PaymentTransfer = async (params, options) => {
    return await curlGet(`${endpoint}` + '/transfer', params, options);
}
