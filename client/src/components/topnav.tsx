import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './topnav.css';

class Navbar extends Component {
	
	render() {
		return (
			<header>
				<h2>Michael's Website</h2>
				<nav>
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/projects">Projects</Link></li>
						<li><Link to="/contact">Contact Me</Link></li>
					</ul>
				</nav>
				<a className="login" href="login"><button className="topNavButton">Login</button></a>
			</header>
		);
	}
}

export default Navbar;
