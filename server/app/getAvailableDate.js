import Meeting from './Rooms/list.room'
import jsonfile from 'jsonfile'
import applyReservation from './Manage/applyReservation'
import dateAdd from './function_date'

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

function get_AvailabilityBy(start, end, owner, room, duration, callback) {
	if (!start || !end || !owner || !room || !duration)
		return ;
	const new_reservation =
	{
		start,
		end,
		room,
		owner,
		"duration_min": duration
	};
	applyReservation(new_reservation, function(rep) {
		callback(rep);
	})
}

module.exports = get_AvailabilityBy;
