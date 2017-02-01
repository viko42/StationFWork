import React, { Component } from 'react';
import { Link } from 'react-router'
import '../App.css';

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("main").style.marginLeft= "0";
	document.body.style.backgroundColor = "white";
}

class Header extends Component {
	render() {
		return (
		<div id="mySidenav" className="sidenav">
		  <a href="javascript:void(0)" className="closebtn sidenavlink" onClick={closeNav}>&times;</a>
		  <Link to="/home" className="sidenavlink">Accueil</Link>
		  <Link to="/search" className="sidenavlink">Rechercher</Link>
		  <Link to="/book" className="sidenavlink">Reserver</Link>
		</div>
		)
	}
}

module.exports = Header;
