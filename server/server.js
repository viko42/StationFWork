import express from 'express'
import mongoose from 'mongoose'
import routes from './app/Router/routes'
const cors = require('cors');

const app = express();

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://Login:Pass@ds021182.mlab.com:21182/stationftest');

app.use(require('./app/Router/routes'));
app.get('/', routes);

app.listen(8080, () => {
	console.log('Server started');
});
