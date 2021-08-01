const moment = require('moment');
const masterInstance = require('./sequelize');
const orm_models = require('./models');
const DataTypes = require('sequelize/lib/data-types')

module.exports.initialize = async () => {
    if (!masterInstance.connected) {
        await masterInstance.connect();
        return masterInstance;
    }
    return masterInstance;
}

module.exports.close = async () => {
    await masterInstance.close();
}

module.exports.connected_orm = async () => {
    const sequelize = masterInstance.conn;

    DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
        date = this._applyTimezone(date, options)
        return moment(date).toISOString();
    }

    return orm_models.initialize(sequelize);
}