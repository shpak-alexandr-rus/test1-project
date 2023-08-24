import 'dotenv/config';
import * as winston from 'winston';

const logger: winston.Logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: process.env.LOGGER_LEVEL,
      filename: process.env.LOGGER_FILE_PATH,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(
          (rec) => `${rec.timestamp}: [${rec.level}]:\t ${rec.message}`,
        ),
      ),
    }),
    new winston.transports.Console({
      level: process.env.LOGGER_LEVEL,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(
          (rec) => `${rec.timestamp}: [${rec.level}]:\t ${rec.message}`,
        ),
      ),
    }),
  ],
});

export default logger;
