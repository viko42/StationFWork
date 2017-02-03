import Meeting from '../Rooms/list.room'
import bodyParser from 'body-parser'
import get_AvailabilityBy from '../available'
import searchAllMatchedRooms from '../Search/searchRoom'
const express = require('express');
const router = express();
const jsonfile = require('jsonfile')
// import dateAdd from './function_date'

module.exports = router;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

router.get('/rooms/event', (req, res) => {
	jsonfile.readFile('app/Reservation/resa.json', function(err, obj) {
		console.log(obj)
		res.json(obj);
	});
});

router.put('/room/book', (req, res) => {
	const start = new Date(req.body.start),
		end = new Date(req.body.end),
		owner = req.body.owner,
		room = req.body.room,
		duration = req.body.duration_min;
	get_AvailabilityBy(start, end, owner, room, duration, res); // Reservation d'une salle
	res.send("OK");
});

// router.get('/rooms/:id/book', (req, res) => {
// 	const requestId = req.params.id;
// 	res.json({ message: 'Vous voulez reserver la salle ' + requestId });
// });

router.get('/room/:id', (req, res) => {
	const requestId = req.params.id;
	res.json({ message: 'Vous avez cherché : ' + Meeting['rooms'][requestId].name});
});

router.get('/rooms', (req, res) => {
	res.json(Meeting);
});
