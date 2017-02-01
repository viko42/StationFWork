import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Booking from './rsvp/booking';
import Search from './rsvp/search';
import {Router, hashHistory, Route} from 'react-router'
import './index.css';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App} />
		<Route path="/home" component={App} />
		<Route path="/book" component={Booking} />
		<Route path="/search" component={Search} />
	</Router>,
  document.getElementById('root')
);
