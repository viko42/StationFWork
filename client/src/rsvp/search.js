import React, { Component } from 'react';
import { Link } from 'react-router'
import Header from '../header/header'
import Navfunc from '../header/nav_func'
import '../App.css';
import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import '../../node_modules/react-select/dist/react-select.css';

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

function logChange(val) {
    console.log("Selected: " + val);
}

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

class Search extends Component {
	componentDidMount() {
		closeNav();
	}
	render() {
		return (
		<div>
		<Header />
		<div className="App" id="main">
			<div className="App-header">
				<h4 className="App-Button-Side" href="javascript:void(0)" onClick={Navfunc.openNav}>&#9776;</h4>
				<section className="App-header-title">Recherche</section>
			</div>
			<h2 className="Book-content-title">Trouvez votre salle de reunion</h2>
			<hr/>
			<Select
			    name="form-field-name"
			    value="one"
			    options={options}
			    onChange={logChange}
			/>
			
		</div>
			</div>
	);
	}
}

export default Search;
