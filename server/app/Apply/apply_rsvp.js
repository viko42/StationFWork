import dateAdd from '../function_date'
const Reservation = require('../Reservation/list.reservation')
const jsonfile = require('jsonfile')


function TryToRsvp(obj, New_resa, callback) {
	searchAvailableInFile(obj, New_resa['date_in'], function(available) {
		if (!available) {
			console.log("Error in search");
			return callback("Error", obj);
		}
		else {
			console.log("Found in search");
			return callback("Found", obj);
		}
	});
}

function searchAvailableInFile(obj, date, callback) {
	for (var i = 0; i < obj['Reservation'].length; i++) {
		if (date >= obj['Reservation'][i]['date_in'] && date < obj['Reservation'][i]['date_out'])
			return callback(0);
	}
	return callback(1);
}

function writeInFile(obj, New_resa, callback) {
	obj['Reservation'].push(New_resa);
	jsonfile.writeFile('app/Reservation/resa.json', obj, {spaces: 2}, function (err) {
		if (err) // Si l'ecriture ne s'est pas faites correctement
			return callback("Error");
		return callback("Success");
	});
}

function ApplyRsvp(New_resa, res) {
	jsonfile.readFile('app/Reservation/resa.json', function(err, obj) {
		TryToRsvp(obj, New_resa, function(msg, obj) {
			if (msg === "Found")
				writeInFile(obj, New_resa, function(msg) {
					if (msg === "Success")
						console.log({ message: "Reservation OK" });
					else
						console.log({message: "Reservation impossible a enregistrer"});
				});
			else
				console.log({message: "Reservation NOT OK"});
		});
	});
}

module.exports = ApplyRsvp;
