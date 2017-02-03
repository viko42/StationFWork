import React, { Component } from 'react';
import { Link } from 'react-router'
import '../App.css';
import {closeNav} from '../header/nav_func'

class Header extends Component {
	render() {
		return (
		<div id="mySidenav" className="sidenav">
		  <a className="closebtn sidenavlink" onClick={closeNav}>&times;</a>
		  <Link to="/home" className="sidenavlink">Accueil</Link>
		  <Link to="/search" className="sidenavlink">Rechercher</Link>
		  {/*<Link to="/book" className="sidenavlink">Reserver</Link>*/}
		</div>
		)
	}
}

module.exports = Header;
