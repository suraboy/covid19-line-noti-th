'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ReconcileTransactions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            get() {
                return this.getDataValue('id');
            }
        },
        ref_id: {
            type: DataTypes.STRING,
            field: 'ref_id',
            get() {
                return this.getDataValue('ref_id');
            }
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            get() {
                return this.getDataValue('name');
            }
        },
        before_status: {
            type: DataTypes.STRING,
            field: 'before_status',
            get() {
                return this.getDataValue('before_status');
            }
        },
        after_status: {
            type: DataTypes.STRING,
            field: 'after_status',
            get() {
                return this.getDataValue('after_status');
            }
        },
        log_response: {
            type: DataTypes.STRING,
            field: 'log_response',
            get() {
                return this.getDataValue('log_response');
            }
        },
        created_at: {
            type: DataTypes.DATE,
            field: 'created_at',
            get() {
                const dateText = this.getDataValue('created_at');
                return moment(dateText).toISOString();
            }
        },
        updated_at: {
            type: DataTypes.DATE,
            field: 'updated_at',
            get() {
                const dateText = this.getDataValue('updated_at');
                return moment(dateText).toISOString();
            }

        },

    }, {
        timestamps: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: 'reconcile_transactions'
    });
};
