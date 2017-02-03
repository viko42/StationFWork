import React, { Component } from 'react';
import {openNav, closeNav} from '../header/nav_func'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Meeting from './rooms'
import '../App.css';
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
const Header =  require('../header/header');
import axios from 'axios';

BigCalendar.momentLocalizer(moment);

export default class Book extends Component {
    constructor(props, context)
    {
        super(props, context);
        this.context = context;
        this.state = {
			events: [],
			compagny: 'unknow'
		};
        BigCalendar.setLocalizer(
            BigCalendar.momentLocalizer(moment)
        );
		this.handleInputChange = this.handleInputChange.bind(this);
		this.fetchData()
	}
	componentDidMount() {
		closeNav();
	}
	async fetchData() {
		const url = 'http://localhost:8080/rooms/event'
		const fetched = await fetch(url)
		const json = await fetched.json()
		const name_room = Meeting['rooms'][this.props.params.id].name;
		const array_sort = [];

		for (var u = 0; u < json['Reservation'].length; u++) {
			if (json['Reservation'][u].room === name_room)
				array_sort.push(json['Reservation'][u])
		}
		for (var i = 0; i < array_sort.length; i++) {
			array_sort[i].start = new Date(array_sort[i].start);
			array_sort[i].end = new Date(array_sort[i].end);
		}
		this.setState({events: array_sort})
	}
	pushEventToApi(obj) {
		axios({
			method: 'put',
			url: 'http://localhost:8080/room/book',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			data: {
				'start': obj.start,
				'end': obj.end,
				'owner': obj.owner,
				'room': obj.room,
				'duration_min': obj.duration_min
			}
		}).then((response) => {
			console.log(response);
		});
	}
    handleSelectSlot({start, end})
    {
		const MaxTime = 120,
			now = new Date(),
			seconds = (end.getTime() - start.getTime()) / 1000,
        	minutes = Math.floor(seconds / 60),
			room = Meeting['rooms'][this.props.params.id].name

		for (var i = 0; i < this.state.events.length; i++) {
			if ((start > this.state.events[i]['start'] && start < this.state.events[i]['end'])
				|| (end > this.state.events[i]['start'] && end < this.state.events[i]['end']))
				return ;
			if ((this.state.events[i]['start'] >= start && this.state.events[i]['start'] < end)
				|| start < now || MaxTime < minutes)
				return ;
		}
		console.log(this.pushEventToApi({start, end, owner: this.state.compagny, duration_min: minutes, room}));
		this.state.events.push({
			start,
			end,
			owner: this.state.compagny,
			duration_min: minutes,
			room
		});
		this.setState({});
		// console.log(this.state);
    }
    handleSelectEvent(event)
    {
		if (event.owner === this.state.compagny){
			if (confirm("Vous voulez supprimer l'event?")) {
				console.log("Vous voulez supprimer l'event");
			}
		}
    }
    EventWeek(props)
    {
        return <strong>{props.event.owner}</strong>
    }
    EventAgenda(props)
    {
        return <em>{props.event.owner}</em>
    }
	handleInputChange(event) {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		});
	}
    render()
    {
        return (
				<div>
				<Header />
				<div className="App" id="main">
					<div className="App-header">
						<h4 className="App-Button-Side" onClick={openNav}>&#9776;</h4>
						<section className="App-header-title">Booking</section>
					</div>
					<h2 className="Book-content-title">Outil de reservation</h2>
					<h4>Reservation de la salle: {Meeting['rooms'][this.props.params.id].name}</h4>
					<hr/>
					<div className="Book-Calendar">
					Choose your name organization
					<form>
						Compagny: <input type="text" name="compagny" onChange={this.handleInputChange}/>
					</form>

                <BigCalendar
						allDayAccessor='false'
                        selectable
                        popup
                        events={this.state.events}
                        onSelectSlot={this.handleSelectSlot.bind(this)}
                        onSelectEvent={this.handleSelectEvent.bind(this)}
						defaultDate={new Date()}
						defaultView='week'
						views={['week']}
                        eventPropGetter={e => ({ className: 'test-class'})}
                        components={{
					              event: this.EventWeek,
					              agenda: {
					            	event: this.EventAgenda
					              }}}
		  		/>
					</div>
				</div>
		    </div>
	);
    }
}
