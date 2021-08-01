const msSQLMasterDb = require('../index');
const logger = require('../../../../../config/logger');

module.exports.getTransferList = async () => {
    try {
        const db = await msSQLMasterDb.connected_orm();
        const query_result = await db['Transfers'].findAll();
        let responseResult = [];
        if (query_result !== undefined && query_result.length > 0) {
            responseResult = query_result;
        }
        return responseResult;
    } catch (error) {
        const err = {
            message: `Cannot insert content @ table ${models.Payments}`,
            cause: error
        };
        logger.error({ err, error });
    }
}
