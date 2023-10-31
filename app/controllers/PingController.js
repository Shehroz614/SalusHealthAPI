const router = require('express')();

router.get('/', (req, res, next) => {
	res.json("test");
});



module.exports = router;
