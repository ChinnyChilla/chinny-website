import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './topnav.css';

class Navbar extends Component {
	render() {
		return (
			<header>
				<h2>Michaels Project</h2>
				<nav>
					<ul className="nav_links">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/projects">Projects</Link></li>
						<li><Link to="/youtubeVideo">youtubeDownloader</Link></li>
					</ul>
				</nav>
				<a className="login" href="login"><button className="topNavButton">Login</button></a>
			</header>
		);
	}
}

export default Navbar;
