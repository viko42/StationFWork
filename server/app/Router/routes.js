import Meeting from '../Rooms/list.room'
import bodyParser from 'body-parser'
import get_AvailabilityBy from '../available'
import searchAllMatchedRooms from '../Search/searchRoom'
const express = require('express');
const router = express();

module.exports = router;
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.put('/room/book', (req, res) => {
	const stuff = req.body.equipement,
		time = req.body.time,
		capacity = req.body.capacity,
		date_resa = req.body.date;

	const RoomNeeded = {
		stuff,
		time,
		capacity,
		date_resa
	}
	console.log("");
	console.log(">>>>> REQ-RESA at "+ date_resa + " <<<<<<<<<<");
	// let value = Meeting['rooms'];
	// if (!value[req.params.id])
	// 	console.log("La salle n'existe pas !");
	// else {
	// 	res.json(req.body);
	// searchAllMatchedRooms(RoomNeeded);
	get_AvailabilityBy(stuff, capacity, date_resa, time, res);
	var date = new Date();
	console.log(date);
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
