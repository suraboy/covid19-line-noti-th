const SequelizeORMInstance = require('../connection');
const { sysConfig } = require('../../../../config/config');

module.exports = new SequelizeORMInstance(sysConfig.masterDb.mssql);