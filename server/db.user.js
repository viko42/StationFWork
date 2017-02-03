import mongoose from 'mongoose'

const Schema = mongoose.Schema

// unique: false
const userSchema = new Schema({
	room: String,
	owner: { type: String, required: true },
	duration_min: { type: Number },
	start: Date,
	end: Date
});
const User = mongoose.model('User', userSchema);
console.log('DB User created !');

module.exports = User;
