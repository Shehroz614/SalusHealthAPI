'use strict';


module.exports = function (app) {
	app.use('/home', require('../app/controllers/HomeController.js'));
	app.use('/auth', require('../app/controllers/AuthController.js'));
	app.use('/appointment', require('../app/controllers/AppointmentController.js'));
	app.use('/notification', require('../app/controllers/NotificationController.js'));
	app.use('/account', require('../app/controllers/AccountController.js'));
	app.use('/chat', require('../app/controllers/ChatController.js'));
	app.use('/', require('../app/controllers/PingController.js'));
	
};
