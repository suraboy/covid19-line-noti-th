const {curlGet} = require("../../../utils/axios");
const {sysConfig} = require("../../../../config/config");
/*Setup default data*/
const endpointConfig = sysConfig.services;
const endpoint = `${endpointConfig.sfinpay_api}` + `cron/promotion`;

module.exports.PromotionStatus = async (params, options) => {
    return await curlGet(`${endpoint}` + '/status', params, options);
}
