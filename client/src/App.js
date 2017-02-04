import React, { Component } from 'react';
// import { Link } from 'react-router'
import Header from './header/header'
import './App.css';
import {openNav, closeNav} from './header/nav_func'

class App extends Component {
	componentDidMount() {
		closeNav();
	}
	render() {
		return (
		<div>
		<Header />
		<div className="App" id="main">
			<div className="App-header">
				<h4 className="App-Button-Side" onClick={openNav}>&#8801;</h4>
				<section className="App-header-title">Accueil</section>
			</div>
			<h2 className="App-content-title">Presentation</h2>
			<h3 className="App-content-text">Salle de reunion #1</h3>
			<div className="App-content-img"><img src="img/reunion1.jpg" alt=""/></div>
			<hr/>
			<h3 className="App-content-text">Salle de reunion #2</h3>
			<div className="App-content-img"><img src="img/reunion1.jpg"  alt=""/></div>
		</div>
			</div>
	);
	}
}

export default App;
