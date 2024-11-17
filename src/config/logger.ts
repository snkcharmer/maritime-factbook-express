import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return JSON.stringify(
        {
          timestamp,
          level,
          message,
          ...meta,
        },
        null,
        2
      );
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: 'logs/logs.log' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

export default logger;
