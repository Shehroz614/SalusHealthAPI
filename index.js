// load dependencies
const path = require('path');
const env = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const cors = require('cors');
const server = require('http').createServer(app);
//Loading Routes
const webRoutes = require('./routes/web');


app.use(cors());
app.use(express.json({ limit: '50mb' }));
env.config();
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
// 	res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization');
// 	next();
//   });

var options = {
	inflate: true,
	type: '*/*'
};

// app.use(bodyParser.raw(options));

webRoutes(app);

server.listen(process.env.PORT || 3000);
console.info('\x1b[32m%s\x1b[0m', `✔️  Listening at ${process.env.PORT}` || 3000);
