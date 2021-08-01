'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Payments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            get() {
                return this.getDataValue('id');
            }
        },
        gateway_invoice_no: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('gateway_invoice_no');
            }
        },
        gateway: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('gateway');
            }
        },
        uid: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('uid');
            }
        },
        seller_id: {
            type: DataTypes.INTEGER,
            get() {
                return this.getDataValue('seller_id');
            }
        },
        status: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('status');
            }
        },
        transfer_status: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('transfer_status');
            }
        },
        updated_by: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('updated_by');
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
        tableName: 'payments'
    });
};
