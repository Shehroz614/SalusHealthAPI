const router = require('express')();
const { Response, validate } = require('../utils/common');
const authManager = require('../managers/authManager');
const Auth = require('../utils/auth');
const PatientAuth = require('../utils/patientAuth');
const { userValidation } = require('../validations/validations');


router.post('/login', validate(userValidation), async (req, res, next) => {
	try {
		const [response, error] = await authManager.signIn(req.body);
		const message = !error ? 'User loggedIn successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});


router.get('/me', Auth, PatientAuth, async (req, res, next) => {
	try {
		const [response, error] = await authManager.getLoggedInUser(req.token);
		const message = !error ? 'CurrentUser fetched successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});


router.post('/forgot-password', async (req, res, next) => {
	try {
		const [response, error] = await authManager.forgetPassword(req.body);
		const message = !error
			? `If an account is registered to ${req.body.email} you will receive an email with a link to reset your password.`
			: error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});


module.exports = router;
