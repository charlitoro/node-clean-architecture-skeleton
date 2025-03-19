import pino from 'pino';
import morgan from 'morgan';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => {
      return { level: label };
    }
  },
  transport:
    process.env.NODE_ENV !== 'production'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined
});

// Streams for Morgan that write through Pino
const httpLoggerStream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

const httpLogger = morgan('combined', { stream: httpLoggerStream });

module.exports = {
  // Main Logger to general use
  logger,
  // Express Morgan middleware
  httpLogger,
  error: (message, meta = {}) => logger.error(meta, message),
  warn: (message, meta = {}) => logger.warn(meta, message),
  info: (message, meta = {}) => logger.info(meta, message),
  debug: (message, meta = {}) => logger.debug(meta, message),
  trace: (message, meta = {}) => logger.trace(meta, message),

  logSystemEvent: (eventName, data = {}) => {
    logger.info({ event: eventName, ...data }, `System event: ${eventName}`);
  },
  logBusinessEvent: (eventName, data = {}) => {
    logger.info({ event: eventName, ...data }, `Business event: ${eventName}`);
  },
  logError: (error, additionalInfo = {}) => {
    logger.error(
      {
        err: {
          message: error.message,
          stack: error.stack,
          ...error
        },
        ...additionalInfo
      },
      error.message || 'An error occurred'
    );
  },

  child: (bindings) => logger.child(bindings)
};
