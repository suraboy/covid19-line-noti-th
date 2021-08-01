const {curlGet} = require("../../../utils/axios");
const {sysConfig} = require("../../../../config/config");
const http = require('http');
/*Setup default data*/
const endpointConfig = sysConfig.services;
const endpoint = `${endpointConfig.covid19_api}`;

module.exports.getTodayCases = async (params, options) => {
    return await curlGet(endpoint, params, options);
}
