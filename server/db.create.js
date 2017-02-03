import User from './db.user'

const newUser = User({
	room: 'Salle #10',
	owner: 'Facebook',
	duration_min: '60',
	"start": "2018-02-01T05:06:00.000Z",
	"end": "2018-02-01T06:06:00.000Z"
});

newUser.save(function(err) {
	if (err)
		throw err;
	console.log('New date added');
});
