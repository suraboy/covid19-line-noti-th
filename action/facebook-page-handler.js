'use strict';
const {getCalPlusFarm, getKathy} = require("../src/services/facebook-pages/facebook");

module.exports.callFacebookPage = async () => {
    return async () => {
        await getKathy();
        await new Promise(resolve => setTimeout(resolve, 3000)); // wait 3s
        await  getCalPlusFarm();
    };
}