import Meeting from './Rooms/list.room'
import jsonfile from 'jsonfile'
import objectSearch from 'object-search'
import _ from 'lodash'
import ApplyRsvp from './Apply/apply_rsvp'
import dateAdd from './function_date'

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

function get_AvailabilityBy(stuff, capacity, date_resa, time, res) {
	if (!stuff)
		console.log("Pas de filtre d'equipement.");
	else
		console.log(stuff);
	if (!capacity)
		console.log("Pas de filtre de capacité.");
	else
		console.log("Capacite de: " + capacity + " max");
	if (!time)
		res.send("Il manque le duration");
	console.log("Pour la date du: " + date_resa);

	const date_out = new Date(dateAdd(date_resa, 'minute', 60));
	const New_resa =
	{
		"room": "Salle#43",
		"owner": "viko_shop",
		"duration_min": time,
		"date_in": date_resa,
		"date_out": date_out
	};
	ApplyRsvp(New_resa, res);
}


module.exports = get_AvailabilityBy;
