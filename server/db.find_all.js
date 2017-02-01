import User from './db.user'

User.find({ username: 'vlancien' }, function(err, user) {
	if (err)
		throw err;
	console.log(user);
});
