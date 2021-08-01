const EventEmitter = require('events');
const ExponentialBackoff = require('simple-backoff').ExponentialBackoff;
const Sequelize = require('sequelize');
const logger = require('../../../config/logger');

const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

class SequelizeORMInstance extends EventEmitter {
    constructor({ host, port, user, password, database, dialect }) {
        super();
        this.connectionString = { host, port, user, password, database, dialect };
        this.connected = false;
        this.reconnected = false;
        this.conn = '';

        this.backoff = new ExponentialBackoff({
            min: 1000,
            max: 15000,
            factor: 2,
            jitter: 0
        });


        this.on('reconnecting', async status => {
            if (status) {
                const backoffTime = this.backoff.next();
                setTimeout(() => this.connect(), backoffTime);
            }
        });
    }

    connect = async () => {
        const self = this;
        return new Promise(async (resolve, reject) => {
            try {
                if (!self.connected) {
                    const sequelize = new Sequelize(
                        self.connectionString.database,
                        self.connectionString.user,
                        self.connectionString.password,
                        {
                            host: self.connectionString.host,
                            dialect: self.connectionString.dialect,
                            dialectOptions: {
                                options: {
                                    encrypt: true,
                                    enableArithAbort: true,
                                }
                            },
                            port: parseInt(self.connectionString.port),
                            logging: false,
                            pool: {
                                max: 50,
                                min: 0,
                                acquire: 30000,
                                idle: 10000
                            },
                            operatorsAliases
                        }
                    );

                    sequelize
                        .authenticate()
                        .then(() => {
                            logger.info(
                                `Sequelize dialect of ${self.connectionString.dialect} : ${self.connectionString.database} is running`
                            );

                            self.connected = true;
                            self.reconnected = false;
                            self.conn = sequelize;
                            self.backoff.reset();
                            resolve();
                        })
                        .catch((error) => {
                            self.connected = false;
                            self.reconnected = true;
                            console.log('DATABASE_ERROR', 'Sequelize connect error!', error);
                            logger.info(
                                `Sequelize dialect of ${self.connectionString.dialect} : ${self.connectionString.database} is closed!!`
                            );
                        });
                }
            } catch (error) {
                self.connected = false;
                self.reconnected = true;
                logger.warn({
                    message: `Sequelize dialect of ${self.connectionString.dialect} : ${self.connectionString.database} connect error!`,
                    error
                });
                self.emit('reconnecting', true);
                reject(error);
            }
        });
    }

    close = async () => {
        if (this.connected) {
            this.conn.close();
        }
    }
}

module.exports = SequelizeORMInstance;