import express from 'express'
import mongoose from 'mongoose'
import User from './db.user'
import async from 'async'
import routes from './app/Router/routes'

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://vlancien:qwqwqw@ds021182.mlab.com:21182/stationf');

app.use(require('./app/Router/routes'));
app.get('/', routes);
//
// const newUser = User({
// 	name: 'Hello',
// 	username: 'vlappd',
// 	password: 'passw',
// 	admin: true
// });
// newUser.save(function(err) {
// 	if (err)
// 		throw err;
// 	console.log('User created');
// });
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
