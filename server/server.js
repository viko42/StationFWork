import express from 'express'
import mongoose from 'mongoose'
import User from './db.user'
import routes from './app/Router/routes'
const cors = require('cors');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://vlancien:qwqwqw@ds021182.mlab.com:21182/stationf');

app.use(require('./app/Router/routes'));
app.get('/', routes);

// import db_create from './db.create'
// import db_find from './db.find_all'
// User.find({}, function(err, users) {
// 	if (err)
// 	throw err;
// 	console.log(users);
// 	console.log('Found');
// });
// User.remove(function(err) {
// 	if (err) throw err;
// 	console.log('User successfully deleted!');
// });
// delete him
app.listen(8080, () => {
	console.log('Server started');
});
