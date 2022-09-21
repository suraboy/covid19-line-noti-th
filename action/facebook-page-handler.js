'use strict';
const {getCalPlusFarm} = require("../src/services/facebook-pages/facebook");

module.exports.callFacebookPage = async () => {
    return await getCalPlusFarm();
}