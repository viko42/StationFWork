import Meeting from './Rooms/list.room'
import jsonfile from 'jsonfile'
import objectSearch from 'object-search'
import _ from 'lodash'
import ApplyRsvp from './Apply/apply_rsvp'
import dateAdd from './function_date'

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

Date.prototype.isValid = function () {
	return this.getTime() === this.getTime();
};
function get_AvailabilityBy(start, end, owner, room, duration, res) {
	if (!start || !end || !owner || !room){
		console.log("Missing argument");
		return ;
	}
	const New_resa =
	{
		room,
		owner,
		"duration_min": duration,
		start,
		end
	};
	ApplyRsvp(New_resa, res);
}


module.exports = get_AvailabilityBy;
