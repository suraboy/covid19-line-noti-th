const fs = require('fs');
const path = require('path');

module.exports.initialize = async (sequelize) => {
    let DB = {};
    const basename = path.basename(__filename);
    fs.readdirSync(__dirname).filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }).forEach((file) => {
        const model = sequelize['import'](path.join(__dirname, file));
        DB[model.name] = model;
    });

    Object.keys(DB).forEach(modelName => {
        if (DB[modelName].associate) {
            DB[modelName].associate(DB);
        }
    });
    return DB;
}