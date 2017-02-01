import React, { Component } from 'react';
import { Link } from 'react-router'
import Header from './header/header'
import logo from './logo.svg';
import './App.css';

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
				<h4 className="App-Button-Side" href="javascript:void(0)" onClick={openNav}>&#9776;</h4>
				<section className="App-header-title">Accueil</section>
			</div>
			<h2 className="App-content-title">Presentation</h2>
			<h3 className="App-content-text">Salle de reunion #1</h3>
			<div className="App-content-img"><img src="img/reunion1.jpg" /></div>
			<hr/>
			<h3 className="App-content-text">Salle de reunion #2</h3>
			<div className="App-content-img"><img src="img/reunion1.jpg" /></div>
		</div>
			</div>
	);
	}
}

export default App;
