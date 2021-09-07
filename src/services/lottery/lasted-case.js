const {curlGet} = require("../../utils/axios");
const {sysConfig} = require("../../../config/config");
/*Setup default data*/
const endpointConfig = sysConfig.services;
const endpoint = `${endpointConfig.lottery_api}`;

module.exports.getLasted = async (params, options) => {
    const pathUrl = `${endpoint}/latest`
    let response = await curlGet(pathUrl, params, options);

    if(response.status === 200){
        response = {
            status: 200,
            response: response.response.response
        }
        return response
    }

    return response
}
