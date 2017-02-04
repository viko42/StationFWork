import dateAdd from '../function_date'
import { LIST_SRC } from '../constants'
const jsonfile = require('jsonfile')

function setReservation(obj, new_reservation, callback) {
	searchAvailableInFile(obj, new_reservation['start'], new_reservation['end'], function(available) {
		if (available === 0)
			return callback("Error", obj);
		else
			return callback("Found", obj);
	});
}

function searchAvailableInFile(obj, start, end, callback) {
	const MaxTime = 120,
		now = new Date(),
		seconds = (end.getTime() - start.getTime()) / 1000,
		minutes = Math.floor(seconds / 60);

	// Recherche si la date est disponible
	for (var i = 0; i < obj['Reservation'].length; i++) {
		const start_file = new Date(obj['Reservation'][i]['start']),
			end_file = new Date(obj['Reservation'][i]['end']);
		if ((start > start_file && start < end_file) || (end > start_file && end < end_file))
			return (false);
		if ((start_file >= start && start_file < end) || start < now || MaxTime < minutes)
			return (true);
	}
	return callback(1);
}

function writeInFile(obj, new_reservation, callback) {
	obj['Reservation'].push(new_reservation);
	jsonfile.writeFile(LIST_SRC, obj, {spaces: 2}, function (err) {
		if (err) // Si l'ecriture ne s'est pas faites correctement
			return callback("Error");
		return callback("Success");
	});
}

function applyReservation(new_reservation, callback) {
	jsonfile.readFile(LIST_SRC, function(err, obj) {
		setReservation(obj, new_reservation, function(msg, obj) {
			if (msg === "Found")
				writeInFile(obj, new_reservation, function(msg) {
					if (msg === "Success")
						callback (true)
					else
						callback (false)
				});
			else
				callback (false)
		});
	});
}

module.exports = applyReservation;
