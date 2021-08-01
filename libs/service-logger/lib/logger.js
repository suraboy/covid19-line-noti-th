const pino = require('pino');
const pinoPretty = require('pino-pretty');

function bufferToJSONForLogger() {
  return { type: 'Buffer', data_base64: this.toString('base64') };
}

/**
 * Initialize logger
 * @param {Object} config
 * @param {string} config.env
 * @param {string} config.name // Remove?
 * @param {string} config.logLevel
 * @param {boolean} config.logPrettyPrint
 * @param {boolean} config.logColor
 * @param {boolean} config.logOneLine
 * @param {string} config.replaceForTooLongLog // Remove?
 * @param {number} config.logLengthThreshold // Remove?
 * @returns {Object} logger
 */
function initLogger(config) {
  const logger = pino({
    level: config.logLevel,
    messageKey: 'message',
    // base: {
    //   pid: config.logPid ? process.pid : null,
    //   hostname: config.logHostname ? os.hostname : null,
    // },
    prettyPrint: config.logPrettyPrint
      ? { colorize: config.logColor, translateTime: true, errorProps: '*' }
      : undefined,
    prettifier: config.logPrettyPrint
      ? (options) => {
        const pretty = pinoPretty(options);
        return (inputData) => {
          const tmp = Buffer.prototype.toJSON;
          Buffer.prototype.toJSON = bufferToJSONForLogger;
          const result = pretty(inputData);
          Buffer.prototype.toJSON = tmp;

          if (config.logOneLine) {
            return result.replace(/\r?\n|\r/g, ' ') + '\n';
          }

          return result;
        };
      }
      : undefined,
  });

  return logger;
}

module.exports.initLogger = initLogger;
