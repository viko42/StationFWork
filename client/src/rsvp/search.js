import React, { Component } from 'react';
import Header from '../header/header'
import {openNav, closeNav} from '../header/nav_func'
import '../App.css';
import '../../node_modules/react-select/dist/react-select.css';
import { Link } from 'react-router'
const Rooms = require('./rooms')

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			equipement: [
				{"TV":false, name: "TV"},
				{"Retro Projecteur":false, name: "Retro Projecteur"}
			],
			capacity: 5
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	stuff_required(stuff, room) {
		var	stuff_need = {"TV": 0, "Retro Projecteur": 0};

		if (!stuff)
			return (1);
		for (var i = 0; i < stuff.length; i++) {
			for (var b = 0; b < room['equipements'].length; b++) {
				if (room['equipements'][b]['name'] === stuff[i]['name'])
					stuff_need[stuff[i]['name']] = 1;
			}
		}
		if ((stuff_need['TV'] === 0 && this.state.equipement[0]["TV"] === true) || (stuff_need['Retro Projecteur'] === 0 && this.state.equipement[1]["Retro Projecteur"] === true))
			return (0);
		return (1);
	}
	capacity_required(capacity, room) {
		if (room >= capacity)
			return (1);
		return (0);
	}
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		if (target.type === 'checkbox') {
			var stateCopy = Object.assign({}, this.state);
			var id = (name === "TV") ? 0 : 1;

			stateCopy.equipement[id][name] = stateCopy.equipement[id][name] === true ? false : true;
			this.setState(stateCopy);
		}
		else {
			this.setState({
				[name]: value
			});
		}
	}
	getEquipementList(equipement) {
		var list = "";

		for (var i = 0; i < equipement.length; i++) {
			list += equipement[i]['name'];
			if (i + 1 < equipement.length)
				list += ", ";
		}
		if (equipement.length === 0)
			list = "Aucun";
		return (list);
	}
	Try(props) {
		var indents = [];
		for (var i = 0; i < props['rooms'].length; i++) {
			if (this.stuff_required(this.state.equipement, Rooms['rooms'][i]) && this.capacity_required(this.state.capacity, props['rooms'][i]['capacity']))
				indents.push(
					<div className='Search-content-list' key={i}>
						{props['rooms'][i]['name']}<br/>
						Capacitée: {props['rooms'][i]['capacity']} personnes<br/>
						Equipement(s): {this.getEquipementList(props['rooms'][i]['equipements'])}<br/>
						<Link to={"/book/" + i} >Reserver cette salle</Link>
						<hr/>
					</div>
				);
		}
		if (indents.length === 0)
			indents.push(
				<div className="Search-content-list">
					Aucune salle trouvée !
				</div>
			);
		return (
			<div>{indents}</div>
		);
	 }
	componentDidMount() {
		closeNav();
	}
	render() {
		return (
		<div>
			<Header />
			<div className="App" id="main">
				<div className="App-header">
					<h4 className="App-Button-Side" onClick={openNav}>&#9776;</h4>
					<section className="Search-header-title">Recherche</section>
				</div>
				<h2 className="Search-content-title">Trouvez votre salle de reunion</h2>
				<hr/>
				<form>
				   <label>
					 <br/>Téleviseur
					 <input
					   name="TV"
					   type="checkbox"
					   checked={this.state.equipement["TV"]}
					   onChange={this.handleInputChange} />
				   </label><br/>
				   <label>
						Retro-Projecteur
					 <input
					   name="Retro Projecteur"
					   type="checkbox"
					   checked={this.state.equipement["Retro Projecteur"]}
					   onChange={this.handleInputChange} />
				   </label>
				   <br />
				   <label>
					Capacity:
					 <input
					   name="capacity"
					   type="number"
					   value={this.state.capacity}
					   onChange={this.handleInputChange}
				   />
				   </label>
				   <hr/>

				   {this.Try(Rooms)}
				 </form>
			</div>
		</div>
	);
	}
}

export default Search;
