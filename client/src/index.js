import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Search from './reservation/search';
import {Router, hashHistory, Route} from 'react-router'
import Book from './reservation/book'
import './index.css';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App} />
		<Route path="/home" component={App} />
		<Route path="/search" component={Search} />
		<Route path="/book/:id" component={Book} />
	</Router>,
  document.getElementById('root')
);
