import winston from 'winston';
import kleur from 'kleur';

const errorFormat = winston.format((info) => {
  if (info.level === 'error') {
    info.message = kleur.red(info.message);
  }
  return info;
})();
const infoFormat = winston.format((info) => {
  if (info.level === 'info') {
    info.message = kleur.blue(info.message);
  }
  return info;
})();
const warnFormat = winston.format((info) => {
  if (info.level === 'warn') {
    info.message = kleur.yellow(info.message);
  }
  return info;
})();

const consoleNewlineFormat = winston.format.combine(
  winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}\n`;
  })
);

export const logger: winston.Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        errorFormat,
        infoFormat,
        warnFormat,
        winston.format.simple(),
        consoleNewlineFormat
      ),
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

process.on('unhandledRejection', (error) => {
  logger.error('Uncaught Promise Rejection:', error);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
});
