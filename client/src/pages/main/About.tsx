import React, {useState, useEffect} from 'react'
import FallingSnow from '../../components/FallingSnow'
import { TypeAnimation } from 'react-type-animation'
import { SocialIcon } from 'react-social-icons'

import './About.css'



function About() {
	return (
		<div id="about-container" style={{
			background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/about-background.png)"
		}}>
		<FallingSnow />
		<div id="name" style={{position: 'absolute', display: "block", width: "100%"}}>
			<TypeAnimation
				sequence={['MICHAEL ZHENG', 3000, 'A SOFTWARE ENGINEER', 2000]}
				repeat={Infinity}
				cursor={false}
				className="centered"
				style={{position: "relative"}}
				wrapper="h2"
			/>
		</div>

		<div id="social-icons" className="centered">
			<SocialIcon network="github" url="https://www.github.com/ChinnyChilla" bgColor='#363636'/>
			<SocialIcon network="linkedin" url="https://www.linkedin.com/in/michaelzheng04/" bgColor='#363636'/>
			{/* <SocialIcon network="twitter" url="https://twitter.com/ChinnyChina1234" bgColor='#363636' /> */}
			<SocialIcon network="email" url="mailto:mzheng72@binghamton.edu" bgColor='#363636' />
		</div>

		<div id="experience">

		</div>

		<div id="scroll-down">
			<div> </div>
		</div>
	</div>
	)
}

export default About