import User from './db.user'

const viko = new User({
	name: 'Viko',
	username: 'vlancien',
	password: 'pass'
});

viko.save(function(err) {
	if (err)
		throw err;
	console.log('User saved successfully');
});
