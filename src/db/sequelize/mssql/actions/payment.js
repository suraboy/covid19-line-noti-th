const msSQLMasterDb = require('../index');
const logger = require('../../../../../config/logger');
const {asyncForEach} = require('../../../../utils');
const tableName = 'Payments';
const table = 'ReconcileTransactions';

module.exports.getPaymentList = async (conditions) => {
    console.log('xxxxxxx');
    try {
        console.log('yyyyyy');
        const extentConditions = Object.assign(conditions, {});
        console.log('123');
        const db = await msSQLMasterDb.connected_orm();
        console.log('456');
        const query_result = await db[tableName].findAll(extentConditions);
        console.log('789');
        let responseResult = [];
        console.log('jjjjjj');
        if (query_result !== undefined && query_result.length > 0) {
            await asyncForEach(query_result, async (item) => {
                responseResult.push(item.dataValues);
            });
        }
        console.log('pppppp');
        return responseResult;
    } catch (error) {
        console.log('zzzzzzz');
        console.log(error)
        const err = {
            message: `Cannot find content by your condition @ table ${tableName}`,
            cause: error
        };
        logger.error({err, error});
    }
}

module.exports.getTransactionReconcile = async (conditions) => {
    try {
        console.log('11111');
        const extentConditions = Object.assign(conditions, {});
        console.log(`extentConditions ====> `, extentConditions);
        console.log('11112');
        const db = await msSQLMasterDb.connected_orm();
        console.log('11113');
        const query_result = await db[table].findAll(extentConditions);
        console.log(`query_result ====> `, query_result);
        let responseResult = [];
        if (query_result !== undefined && query_result.length > 0) {
            await asyncForEach(query_result, async (item) => {
                responseResult.push(item.dataValues);
            });
        }
        console.log(`responseResult ====> `, responseResult);
        console.log('9999');
        return responseResult;
    } catch (error) {
        console.log('22222');
        console.log(error)
        const err = {
            message: `Cannot find transaction reconcile 2c2p @ table ${table}`,
            cause: error
        };
        logger.error({err, error});
    }
}

module.exports.updatePayment = async (params, conditions) => {
    try {
        const db = await msSQLMasterDb.connected_orm();
        const query_result = await db[tableName].update(params, conditions);
        let responseResult = [];
        if (query_result.length > 0 && query_result[0] !== undefined) {
            responseResult.push(query_result[0]);
        }
        return responseResult;
    } catch (error) {
        const err = {
            message: `Cannot update content @ table ${tableName}`,
            cause: error
        }
        logger.error({err, error});
    }
}
