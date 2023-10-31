const router = require('express')();
const {
	 Response ,generatePayload
  } = require('../utils/common');
const homeManager = require('../managers/homeManager');
const Auth = require('../utils/auth');
router.get('/goals',Auth,async(req, res, next) => {
try{
	let payload = await generatePayload(req.query) ;
	  
	const [response,error]=await homeManager.getGoals(payload,req.token);
	const message = !error ? 'Goals fetched successfully!' : error
	res.status(200).json(Response(message, response, !error));
   
}
catch(err){
	res.status(200).json(Response(err.message, err.message, false));
}
});
router.put('/goals',Auth,async(req, res, next) => {
	try{
		const [response,error]=await homeManager.markGoalComplete(req.body,req.token);
		const message = !error ? 'Goals completed successfully!' : error
		res.status(200).json(Response(message, response, !error));
	   
	}
	catch(err){
		res.status(200).json(Response(err.message, err.message, false));
	}
});
router.delete('/goal',Auth,async(req, res, next) => {
	try{
		const [response,error]=await homeManager.deleteGoalHistory(req.body,req.token);
		const message = !error ? 'Goal history deleted successfully!' : error
		res.status(200).json(Response(message, response, !error));
	   
	}
	catch(err){
		res.status(200).json(Response(err.message, err.message, false));
	}
});

module.exports = router;
