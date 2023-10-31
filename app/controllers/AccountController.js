const router = require('express')();
const { Response, validate } = require('../utils/common');
const accountManager = require('../managers/accountManager');
const Auth = require('../utils/auth');
const PatientAuth = require('../utils/patientAuth');
const { userValidation } = require('../validations/validations');


router.put('/personalInfo', Auth, async (req, res, next) => {
	try {
		const [response, error] = await accountManager.updatePersonalInfo(req.body, req.token);
		const message = !error ? 'User information updated successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});

module.exports = router;
