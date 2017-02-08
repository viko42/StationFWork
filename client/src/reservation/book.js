import AlertContainer from 'react-alert'
import React, { Component } from 'react'
import {openNav, closeNav} from '../header/nav_func'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import Meeting from './rooms'
import '../App.css'
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import { API_URL_EVENT, API_URL_BOOK, API_URL } from '../constants'
const Header =  require('../header/header');
import axios from 'axios'

BigCalendar.momentLocalizer(moment);

export default class Book extends Component {
    constructor(props, context) {
        super(props, context);
		this.fetchData()
		this.alertOptions = {
	    	offset: 14,
			position: 'bottom left',
			theme: 'dark',
			time: 5000,
			transition: 'scale'
		};
        this.context = context;
        this.state = {
			events: [],
			compagny: 'unknow'
		};
        BigCalendar.setLocalizer(
            BigCalendar.momentLocalizer(moment)
        );
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	componentDidMount() {
		closeNav();
	}
	async fetchData(callback) {
    const _this = this;
		const url = API_URL_EVENT
		const fetched = await fetch(url).catch(function() {
      _this.msg.error("Connexion impossible");
    })
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
		const url = API_URL_BOOK
		const _this = this;
		const _obj = obj;
		axios({
			method: 'post',
			url: url,
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
		}).then((response, obj) => {
			_this.state.events.push({
				start: _obj.start,
				end: _obj.end,
				owner: _this.state.compagny,
				duration_min: _obj.minutes,
				room: _obj.room
			});
			_this.setState({});
			return _this.msg.success("La date vient d'etre validée");

		}).catch(function (error) {
      _this.msg.error("Connexion impossible");
			if (error)
				return (false)
			return (true)
		})
	}
	handleSelectSlot({start, end})
  	{
		const MaxTime = 120,
			now = new Date(),
			seconds = (end.getTime() - start.getTime()) / 1000,
        	minutes = Math.floor(seconds / 60),
			room = Meeting['rooms'][this.props.params.id].name

		if (now > start || now > end || start > end)
			return this.msg.error("La date n'est pas correcte.");
		if (MaxTime < minutes)
			return this.msg.error("Le temps maximal est de 2 heures.");
		for (var i = 0; i < this.state.events.length; i++) {
			if ((start > this.state.events[i]['start'] && start < this.state.events[i]['end'])
				|| (end > this.state.events[i]['start'] && end < this.state.events[i]['end']))
				return ;
			if ((this.state.events[i]['start'] >= start && this.state.events[i]['start'] < end)
				|| start < now || MaxTime < minutes)
				return ;
		}
		this.pushEventToApi({start, end, owner: this.state.compagny, duration_min: minutes, room});


	}
	showAlert(message){
	  this.msg.show(message, {
		time: 2000,
		type: 'success',
		icon: <img src="img/success.png" alt=""/>
	  });
	  this.msg.error(message, {time: 2000,type: 'error',icon: <img src="img/error.png" alt="" />});
	  this.msg.info(message, {time: 2000,type: 'info',icon: <img src="img/info.png" alt="" />});
	}
    handleSelectEvent(event) {
		const url = API_URL + "/room/book";

		if (event.owner === this.state.compagny){
			if (confirm("Vous voulez supprimer l'event?")) {
				const self = this;

				axios({
					method: 'delete',
					url: url,
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					data: event
				}).then(function(res) {
					self.fetchData()
          self.msg.info("La date vient d'etre supprime.")
				}).catch(function(error) {
          self.msg.error("Connexion impossible")
				});
			}
		}
    }
	EventWeek(props) {
		return <strong>{props.event.owner}</strong>
	}
	EventAgenda(props) {
		return <em>{props.event.owner}</em>
	}
	handleInputChange(event) {
		const target = event.target,
			name = target.name,
			value = target.value;

		this.setState({
			[name]: value
		});
	}
    render()
    {
        return (
		<div>
			<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
			<Header />
			<div className="App" id="main">
				<div className="App-header">
					<h4 className="App-Button-Side" onClick={openNav}>&#8801;</h4>
					<section className="App-header-title">Booking</section>
				</div>
				<h2 className="Book-content-title">Outil de reservation</h2>
				<h4>Reservation de la salle: {Meeting['rooms'][this.props.params.id].name}</h4>
				<hr/>
				<div className="Book-Calendar">
					Entrez le nom de l'entreprise
				<form>
					Nom: <input type="text" name="compagny" onChange={this.handleInputChange}/>
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
