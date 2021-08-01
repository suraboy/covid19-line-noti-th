'use strict';
const {getTodayCases} = require("../src/services/covid19/cronjobs/today-case");

module.exports.covid19TodayCaseNotification = async () => {
    return await getTodayCases();
}