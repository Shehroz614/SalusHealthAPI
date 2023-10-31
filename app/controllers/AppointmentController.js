const router = require('express')();
const { Response, generatePayload } = require('../utils/common');
const appointmentManager = require('../managers/appointmentManager');
const Auth = require('../utils/auth');


router.get('/', Auth, async (req, res, next) => {
	try {
		let payload = await generatePayload(req.query);
		const [response, error] = await appointmentManager.getAppointments(payload, req.token);
		const message = !error ? 'Appointments fetched successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});


router.post('/appointmentsTypesData', Auth, async (req, res, next) => {
	try {
		const [response, error] = await appointmentManager.getAppointmentsTypesData(
			req.body,
			req.token
		);
		const message = !error ? 'AppointmentsTypesData fetched successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});


router.post('/getOrganization', Auth, async (req, res, next) => {
	try {
		const [response, error] = await appointmentManager.getOrganization(req.body, req.token);
		const message = !error ? 'Organization fetched successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});


router.post('/getDaysAvailable', Auth, async (req, res, next) => {
	try {
		const [response, error] = await appointmentManager.getDaysAvailable(req.body, req.token);
		const message = !error ? 'Day Available fetched successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});


router.post('/getDaysAvailableSlot', Auth, async (req, res, next) => {
	try {
		const [response, error] = await appointmentManager.getDaysAvailableSlot(req.body, req.token);
		const message = !error ? 'Day Available Slot fetched successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});


router.post('/create', Auth, async (req, res, next) => {
	try {
		const [response, error] = await appointmentManager.createAppointment(req.body, req.token);
		const message = !error ? 'Appointment Scheduled successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});


router.delete('/deleteAppointment/:id', Auth, async (req, res, next) => {
	try {
		const [response, error] = await appointmentManager.deleteAppointment(req.params, req.token);
		const message = !error ? 'Appointment deleted successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});


module.exports = router;
