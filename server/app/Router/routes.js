import Meeting from '../Rooms/list.room'
import bodyParser from 'body-parser'
import get_AvailabilityBy from '../getAvailableDate'
import searchAllMatchedRooms from '../Search/searchRoom'
import { LIST_SRC } from '../constants'
import deleteReservation from '../Manage/deleteReservation'
const express = require('express');
const router = express();
const jsonfile = require('jsonfile')

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
	jsonfile.readFile(LIST_SRC, function(err, obj) {
		res.json(obj);
	});
});

router.post('/room/book', (req, res) => {
	const start = new Date(req.body.start),
		end = new Date(req.body.end),
		owner = req.body.owner,
		room = req.body.room,
		duration = req.body.duration_min,
		now = new Date();

	if (now < start && now < end && start < end){
		get_AvailabilityBy(start, end, owner, room, duration, function(result) { // Reservation d'une salle
			if (result)
				console.log("Un slot vient d'etre pose par " + owner);
		});
	}
	res.send({ message: "Fin de la requete."});
});

router.delete('/room/book', (req, res) => {
	const start = new Date(req.body.start),
		end = new Date(req.body.end),
		owner = req.body.owner,
		room = req.body.room,
		duration = req.body.duration_min;

	const reservation = {
		start,
		end,
		room,
		owner,
		duration_min: duration
	}
	deleteReservation(reservation, function() {
		console.log("Un slot vient d'etre supprime par " + owner);
	});
	res.send({ message: "Slot deleted"});
});

// router.get('/room/:id', (req, res) => {
// 	const requestId = req.params.id;
// 	res.json({ message: 'Vous avez cherché : ' + Meeting['rooms'][requestId].name});
// });

router.get('/rooms', (req, res) => {
	res.json(Meeting);
});
