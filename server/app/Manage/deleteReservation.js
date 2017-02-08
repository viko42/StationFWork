import dateAdd from '../function_date'
import { LIST_SRC } from '../constants'
const jsonfile = require('jsonfile')

function delReservation(obj, new_reservation, callback) {
	searchAvailableInFile(obj, new_reservation, function(available, updated_array) {
		if (available === 0)
			return callback("not Found for delete", updated_array);
		else
			return callback("Found for delete", updated_array);
	});
}

function searchAvailableInFile(obj, new_reservation, callback) {
	var is_found;

	const room = new_reservation['room'],
		owner = new_reservation['owner'],
		start = new Date(new_reservation['start']),
		end = new Date(new_reservation['end']),
		duration = new_reservation['duration_min'],
		updated_array = { Reservation: []};

	// Recherche si la date est disponible
	for (var i = 0; i < obj['Reservation'].length; i++) {
		const start_file = new Date(obj['Reservation'][i]['start']),
			end_file = new Date(obj['Reservation'][i]['end']);

		if (start.getTime() === start_file.getTime() && end.getTime() === end_file.getTime() &&
			owner === obj['Reservation'][i]['owner'] && room === obj['Reservation'][i]['room'])
			is_found = 1;
		else
			updated_array['Reservation'].push(obj['Reservation'][i])
	}
	if (is_found === 1)
		callback(1, updated_array);
	return callback(0, updated_array);
}

function writeInFile(obj, callback) {
	jsonfile.writeFile(LIST_SRC, obj, {spaces: 2}, function (err) {
		if (err) // Si l'ecriture ne s'est pas faites correctement
			return callback("Error");
		return callback("Success");
	});
}

function deleteReservation(new_reservation, callback) {
	jsonfile.readFile(LIST_SRC, function(err, obj) {
		delReservation(obj, new_reservation, function(msg, obj) {
			if (msg === "Found for delete"){
				writeInFile(obj, function(msg) {
					if (msg === "Success")
						return (true)
					else
						return (false)
				});
			}
			else
				return (false)
		});
	});
}

module.exports = deleteReservation;
