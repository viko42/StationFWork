// import React, { Component } from 'react';
//
// class navfunc {
//
// 	function closeNav() {
// 		document.getElementById("mySidenav").style.width = "0";
// 		document.getElementById("main").style.marginLeft= "0";
// 		document.body.style.backgroundColor = "white";
// 	}
// }
// module.exports = navfunc;
export function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
export function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("main").style.marginLeft= "0";
	document.body.style.backgroundColor = "white";
}
// function closeNav() {
// 	document.getElementById("mySidenav").style.width = "0";
// 	document.getElementById("main").style.marginLeft= "0";
// 	document.body.style.backgroundColor = "white";
// }
//
//
// module.exports = closeNav;
