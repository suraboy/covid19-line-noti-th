const fs = require("fs");
const {compile} = require('handlebars');
const mjml2html = require('mjml');
const {sysConfig} = require("../../config/config");
const sendGridConfig = sysConfig.sendgrid;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sendGridConfig.authorizedKey);

module.exports.SendEmailWithSendGrid = async (jsonBodyMessage, template) => {
    jsonBodyMessage.from = sendGridConfig.sender;
    const sendMessagePromise = sgMail
        .send(jsonBodyMessage)
        .then(() => {
        }, error => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        });

    return Promise.all([sendMessagePromise]).then(() => {
        return console.log("success")
    }).catch((err) => {
        return console.log(err);
    });
}

module.exports.readEmailTemplate = async (FileName) => {
    return fs.readFileSync('src/resources/emails/' + FileName, 'utf8');
}

module.exports.compileEmailTemplate = async (template, params) => {
    return compile(template)(params);
}

module.exports.convertToHtml = async (mjml) => {
    let output = mjml2html(mjml);
    return output.html;
}