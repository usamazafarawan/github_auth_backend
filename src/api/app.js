import express from 'express';
import globalErrorHandler from './helpers/globalErrorHandler.js';
import logger from './config/logger.js';
import router from './components/index.js';
import config from './config/config.js';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';


const app = express();

let corsOptions = {
    // origin: config.whitelistUrl
    origin: '*'
};


app.use(express.json({ limit: config.fileSizeLimit }));
app.use(express.urlencoded({ limit: config.fileSizeLimit, extended: false }));
app.use(mongoSanitize());
app.use(cors(corsOptions));
app.use(config.apiVersionUrl, router);



app.all('*', (req, res, next) => {
    next(new Error(`Can't find ${req.originalUrl} on this server!`));
});


app.use(globalErrorHandler);

app.listen(config.appPort, () => {
    logger.info(`Listening on ${config.appPort}`);
});

export default app;