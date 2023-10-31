const router = require('express')();
const {
	Response, validate
} = require('../utils/common');
const notificationManager = require('../managers/notificationManager');
const Auth = require('../utils/auth');
const PatientAuth = require('../utils/patientAuth');
router.get('/settings/:id',Auth,PatientAuth, async (req, res, next) => {
	try {
		const [response, error] = await notificationManager.getNotificationSettings({id:parseInt(req.params.id)},req.token);
		const message = !error ? 'Notification settings fetched successfully!' : error
		res.status(200).json(Response(message, response, !error));

	}
	catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}

});
router.put('/settings',Auth,PatientAuth, async (req, res, next) => {
	try {
		const [response, error] = await notificationManager.updateNotificationSettings(req.body,req.token);
		const message = !error ? 'Notification setting updated successfully!' : error
		res.status(200).json(Response(message, response, !error));

	}
	catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}

});

module.exports = router;
