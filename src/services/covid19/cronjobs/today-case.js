const {curlGet} = require("../../../utils/axios");
const {sysConfig} = require("../../../../config/config");

module.exports.getTodayCases = async (params, options) => {
    const endpointConfig = sysConfig.services;
    const endpoint = `${endpointConfig.covid19_api}`;
    return await curlGet(endpoint, params, options);
}

//api thai : https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces
module.exports.getSongkhlaTodayCases = async (params, options) => {
    const endpointConfig = sysConfig.services;
    const endpoint = `${endpointConfig.thai_covid19_api}/api/Cases/today-cases-by-provinces`;
    return await curlGet(endpoint, params, options);
}


