import mongoose from 'mongoose'

const Schema = mongoose.Schema

// unique: false
const BookSchema = new Schema({
	start: Date,
	end: Date,
	room: { type: String, required: true },
	owner: { type: String, required: true },
	duration_min: { type: Number }
});

console.log('DB Book created !');
const Book = mongoose.model('Book', BookSchema);

module.exports = Book;

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
