'use strict';
const {getCalPlusFarm, getKathy} = require("../src/services/facebook-pages/facebook");

module.exports.callFacebookPage = async () => {
    return async () => {
        await getKathy();
        await  getCalPlusFarm();
    };
}