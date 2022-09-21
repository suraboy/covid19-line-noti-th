const {curlGet} = require("../../../utils/axios");

module.exports.getCalPlusFarm = async (params, options) => {
    const endpoint = `https://www.facebook.com/pdkfarm`;
    return await curlGet(endpoint, params, options);
}


