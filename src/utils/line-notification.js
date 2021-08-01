const {sysConfig} = require("../../config/config");
const LineToken = sysConfig.lineNotify.token
const lineNotify = require('line-notify-nodejs')(LineToken);

module.exports.pushLineNotification = async (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            lineNotify.notify(params).then(() => {
                console.log('send completed!');
            });
        } catch (errors) {
            reject(errors);
        }
    });
}