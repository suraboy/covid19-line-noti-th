const {curlGet} = require("../../utils/axios");

module.exports.getCalPlusFarm = async (params, options) => {
    const endpoint = `https://www.facebook.com/pdkfarm`;
    return await curlGet(endpoint, params, options);
}

module.exports.getKathy = async (params, options) => {
    const endpoint = `https://www.facebook.com/shopping.kathy`;
    return await curlGet(endpoint, params, options);
}


