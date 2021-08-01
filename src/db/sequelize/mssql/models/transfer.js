'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Transfers', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            get() {
                return this.getDataValue('id');
            }
        },
        status: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('status');
            }
        },
        created_at: {
            type: DataTypes.DATE,
            field: 'created_at',
            get() {
                const dateText = this.getDataValue('created_at');
                return moment(dateText).toISOString(true);
            }
        },
        updated_at: {
            type: DataTypes.DATE,
            field: 'updated_at',
            get() {
                const dateText = this.getDataValue('updated_at');
                return moment(dateText).toISOString(true);
            }
        },

    }, {
        timestamps: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: 'transfers'
    });
};
