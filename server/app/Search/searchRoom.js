import Meeting from '../Rooms/list.room'

function stuff_required(stuff, room) {
	var stuff_needed = 0;

	if (!stuff)
		return (1);
	for (var i = 0; i < stuff.length; i++) {
		for (var b = 0; b < room['equipements'].length; b++) {
			if (room['equipements'][b]['name'] === stuff[i])
				stuff_needed += 1;
		}
	}
	if (stuff.length === stuff_needed)
		return (1);
	return (0);
}

function capacity_required(capacity, room) {
	if (room['capacity'] >= capacity)
		return (1);
	return (0);
}

function searchAllMatchedRooms(RoomNeeded) {
	var MyResult = [];

	for (var i = 0; i < Meeting['rooms'].length; i++) {
		if (stuff_required(RoomNeeded['stuff'], Meeting['rooms'][i])
		&& capacity_required(RoomNeeded['capacity'], Meeting['rooms'][i]))
			MyResult.push(Meeting['rooms'][i]);
	}
	console.log(MyResult);
}

module.exports = searchAllMatchedRooms;
