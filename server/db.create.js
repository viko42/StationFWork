import User from './db.user'

const newUser = User({
	name: 'Hello',
	username: 'vlapp',
	password: 'passw',
	admin: true
});

newUser.save(function(err) {
	if (err)
		throw err;
	console.log('User created');
});
