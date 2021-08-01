const msSQLMasterDb = require('../index');
const logger = require('../../../../../config/logger');
const tableName = 'ReconcileTransactions';

module.exports.createReconcileTransaction = async (content) => {
    try {
        const db = await msSQLMasterDb.connected_orm();
        const query_result = await db[tableName].create(content);
        let responseResult = [];
        if (query_result.length > 0 && query_result[0] !== undefined) {
            responseResult.push(query_result[0].dataValues);
        }
        return responseResult;
    } catch (error) {
        const err = {
            message: `Cannot insert content @ table ${tableName}`,
            cause: error
        };
        logger.error({ err, error });
    }
}
