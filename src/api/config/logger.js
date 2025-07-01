// import appRoot from 'app-root-path';
// import fs from 'fs';
// import path from 'path';

// const logDir = path.join(process.cwd(), 'logs');

// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir, { recursive: true });
// }

// import winston from 'winston';

// // define the custom settings for each transport (file, console)
// const options = {
//   file: {
//     level: 'info',
//     filename: `${appRoot}/logs/app.log`,
//     handleExceptions: true,
//     json: true,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     colorize: true,
//     timestamp: true,
//   },
//   console: {
//     level: 'debug',
//     handleExceptions: true,
//     json: false,
//     colorize: true,
//     timestamp: true,
//   },
//   exceptions: {
//     level: 'error',
//     filename: `${appRoot}/logs/exceptions.log`,
//     timestamp: true,
//     maxsize: 5242880,
//     json: true,
//     colorize: true,
//   },
// };

// // instantiate a new Winston Logger with the settings defined above
// const logger = new winston.createLogger({
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json(),
//     winston.format.colorize(),
//   ),
//   transports: [
//     new winston.transports.File(options.file),
//     new winston.transports.Console(options.console),
//     new winston.transports.File(options.exceptions),
//   ],
//   exceptionHandlers: new winston.transports.File(options.exceptions),
//   exitOnError: false, // do not exit on handled exceptions
// });

// // create a stream object with a 'write' function that will be used by `morgan`
// logger.stream = {
//   write: (message) => {
//     // use the 'info' log level so the output will be picked up by both transports (file and console)
//     logger.info(message);
//   },
// };

// // module.exports = logger;
// export default logger;

const logger = {
  info: console.log,
  debug: console.debug,
  warn: console.warn,
  error: console.error,
  log: console.log,
  stream: {
    write: (message) => {
      console.log(message.trim());
    },
  },
};

export default logger;
