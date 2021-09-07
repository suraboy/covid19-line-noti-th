module.exports.pushLineNotification = async (params,token) => {
    const lineNotify = require('line-notify-nodejs')(token);
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