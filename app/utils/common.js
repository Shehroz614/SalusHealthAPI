const camelCaseKeys = require('camelcase-keys');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const Response = function (message, result, success) {
	return {
		message,
		result: result == null ? {} : camelCaseKeys(result),
		success
	};
};


const ErrorResponse = (message, result = null) => Response(message, camelCaseKeys(result), false);


const validate = (validations) => async (req, res, next) => {
	await Promise.all(validations.map((validation) => validation.run(req)));
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	res.status(200).send(ErrorResponse('Validation Error', errors.array()));
};


const generatePayload = async (query) => {
	const payload = {};
	for (const queryParam in query) {
		let paramValue = query[queryParam];
		paramValue = paramValue.replace(/^['"]|['"]$/g, '');
		const integerParams = ['user_id', 'offset'];
		const booleanParams = ['date_range_is_selected', 'with_all_statuses', 'should_paginate'];
		if (integerParams.includes(queryParam)) {
			paramValue = parseInt(paramValue, 10);
		}
		if (booleanParams.includes(queryParam)) {
			paramValue = paramValue === 'true';
		}
		if (paramValue === 'null') {
			paramValue = null;
		}
		payload[queryParam] = paramValue;
	}
	return payload;
};


module.exports = {
	Response,
	ErrorResponse,
	validate,
	generatePayload
};
