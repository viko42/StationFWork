import React, { Component } from 'react';
import { Link } from 'react-router'
import Header from '../header/header'
import Navfunc from '../header/nav_func'
import '../App.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("main").style.marginLeft= "0";
	document.body.style.backgroundColor = "white";
}

const myEventsList = [];

const MyCalendar = props => (
  <div>
    <BigCalendar
      events={myEventsList}
      startAccessor='startDate'
      endAccessor='endDate'
    />
  </div>
);
class Booking extends Component {
	componentDidMount() {
		closeNav();
	}
	render() {
		return (
		<div>
		<Header />
		<div className="App" id="main">
			<div className="App-header">
				<h4 className="App-Button-Side" href="javascript:void(0)" onClick={openNav}>&#9776;</h4>
				<section className="App-header-title">Booking</section>
			</div>
			<h2 className="Book-content-title">Outil de reservation</h2>
			<hr/>
			<div className="Book-Calendar">
			<MyCalendar/>
			</div>
		</div>
			</div>
	);
	}
}

export default Booking;
