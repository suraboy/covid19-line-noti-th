const { initLogger } = require('../libs/service-logger/lib/logger');
const { sysConfig } = require('./config');
const config = sysConfig.logger;


const logger = initLogger({
  // env: config.env,
  name: config.nodeId,
  logLevel: config.logLevel,
  // logPid: config.env !== 'development',
  // logHostname: config.env !== 'development',
  // logTarget: config.logTarget,
  // logDirectoryPath: config.logDirectoryPath,
  // logFormat: config.logFormat,
  logPrettyPrint: config.logPrettyPrint,
  logColor: config.logColor,
  logOneLine: config.logOneLine,
  // replaceForTooLongLog: config.replaceForTooLongLog,
  // logLengthThreshold: config.logLengthThreshold,
});

module.exports = logger;
