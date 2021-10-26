const {curlGet} = require("../../utils/axios");
const {sysConfig} = require("../../../config/config");
/*Setup default data*/
const endpointConfig = sysConfig.services;
const endpoint = `${endpointConfig.crypto_api}`;

module.exports.getSymbols = async (params, options) => {
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const url = endpoint + 'v1/cryptocurrency/quotes/latest?' + queryString
    return await curlGet(url, options);
}

module.exports.getListingLast = async (params, options) => {
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const url = endpoint + 'v1/cryptocurrency/listings/latest?' + queryString;
    return await curlGet(url, options);
}

