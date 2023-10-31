const router = require('express')();
const { Response, validate } = require('../utils/common');
const chatManager = require('../managers/chatManager');
const Auth = require('../utils/auth');


router.post('/', Auth, async (req, res, next) => {
	try {
		const [response, error] = await chatManager.getAllChats(req.body, req.token);
		const message = !error ? 'User chats fetched successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});


router.post('/conversation', Auth, async (req, res, next) => {
	try {
		const [response, error] = await chatManager.getConversation(req.body, req.token);
		const message = !error ? 'User conversations fetched successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});


router.post('/newChat', Auth, async (req, res, next) => {
	try {
		const [response, error] = await chatManager.createNewChat(req.body, req.token);
		const message = !error ? 'User new chat created successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});


router.put('/status', Auth, async (req, res, next) => {
	try {
		const [response, error] = await chatManager.updateChatStatus(req.body, req.token);
		const message = !error ? 'User  chat status updated successfully!' : error;
		res.status(200).json(Response(message, response, !error));
	} catch (err) {
		res.status(200).json(Response(err.message, err.message, false));
	}
});
module.exports = router;
