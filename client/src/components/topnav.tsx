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
			<header className="topheader">
				<h2 className={this.state.responsive ? "websiteTitle hidden" : "websiteTitle shown"}>Michael's Website</h2>
				<nav>
					<div className={this.state.responsive ? "responsive shown" : "responsive hidden"}>
						<h4><Link className="responsive link" to="/">Home</Link></h4>
						<h4><Link className="responsive link" to="/about">About</Link></h4>
						<h4><Link className="responsive link" to="/projects">Projects</Link></h4>
						<h4><Link className="responsive link" to="/contact">Contact Me</Link></h4>
					</div>
					<ul>
						<li className="icon"><a className={this.state.responsive ? "responsive" : ""} onClick={() => { this.setState({ ...this.state, responsive: !this.state.responsive }) }}>&#9776;</a></li>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/projects">Projects</Link></li>
						<li><Link to="/contact">Contact Me</Link></li>
					</ul>
				</nav>
				<Link to="/login" className="topNavButtonLink"><button className="topNavButton" >Login</button></Link>
			</header>
		);
	}
}

export default Navbar;
