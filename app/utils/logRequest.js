const getLoggerForStatusCode = (statusCode) => {
	if (statusCode >= 500) {
		return console.error.bind(console);
	}
	if (statusCode >= 400) {
		return console.warn.bind(console);
	}

	return console.log.bind(console);
};

module.exports = (req, res, next) => {
	console.info(`${req.method} ${req.originalUrl}`);

	const cleanup = () => {
		res.removeListener('finish', logFn);
		res.removeListener('close', abortFn);
		res.removeListener('error', errorFn);
	};

	const logFn = () => {
		cleanup();
		const logger = getLoggerForStatusCode(res.statusCode);
		logger(
			`${res.statusCode} ${res.statusMessage}; ${
				res.get('Content-Length') || 0
			}b sent`
		);
	};

	const abortFn = () => {
		cleanup();
		console.warn('Request aborted by the client');
	};

	const errorFn = (err) => {
		cleanup();
		console.error(`Request pipeline error: ${err}`);
	};

	res.on('finish', logFn);
	res.on('close', abortFn);
	res.on('error', errorFn);

	next();
};
