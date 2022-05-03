/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './topnav.css';


interface Props {}

interface topNav {
	responsive: boolean
}
class Navbar extends Component<Props, topNav> {
	public state: topNav = {
		responsive: false
	}
	render() {
		return (
			<header>
				<h2 className="websiteTitle">Michael's Website</h2>
				<nav>
					<div className={this.state.responsive ? "responsive shown" : "responsive hidden"}>
						<h4>Home</h4>
						<h4>About</h4>
						<h4>Projects</h4>
						<h4>Contact Me</h4>
					</div>
					<ul>
						<li className="icon"><a href="javascript:void(0)" className={this.state.responsive ? "responsive" : ""} onClick={() => { this.setState({ ...this.state, responsive: !this.state.responsive }) }}>&#9776;</a></li>
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
