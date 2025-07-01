import { handleError } from './responseHandler.js';
import logger from '../config/logger.js';
import message from '../config/message.js';

export default (fn) => (req, res) => {
	fn(req, res).catch((error) => {
		logger.error(`Error from catchasync : ${error}`);
		if (process.env.env === 'production') {
			return handleError({
				res,
				err: message.SOMETHING_WENT_WRONG,
				data: error?.message,
			});
		}

		return handleError({ res, err: error, data: error });
	});
};
