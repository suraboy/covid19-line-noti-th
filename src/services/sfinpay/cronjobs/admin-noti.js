const {curlGet} = require("../../../utils/axios");
const {sysConfig} = require("../../../../config/config");
/*Setup default data*/
const endpointConfig = sysConfig.services;
const endpoint = `${endpointConfig.sfinpay_api}` + `cron/adminnoti`;

module.exports.AdminNotification = async (params, options) => {
    return await curlGet(endpoint, params, options);
}
