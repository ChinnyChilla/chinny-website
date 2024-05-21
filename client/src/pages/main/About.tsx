import React, {useState, useEffect} from 'react'
import FallingSnow from '../../components/FallingSnow'
import { TypeAnimation } from 'react-type-animation'
import { SocialIcon } from 'react-social-icons'
import Timeline from '../../components/Timeline'
import { SiOdoo, SiContentstack } from 'react-icons/si'
import { TbCircleLetterB } from 'react-icons/tb'


import './About.css'



const About: React.FC = () => {

	const experiences = [
		{
			title: "Odoo Inc, Full Stack Software Engineer Intern",
			location: "Buffalo, NY",
			image: SiOdoo,
			date: [new Date("2023-06-05"), new Date("2023-08-23")],
			tech: ["Python", "JavaScript", "XML", "CSS", "PostgresSQL", "git"]
		},
		{
			title: "Binghamton University, Teaching Assistant",
			location: "Binghamton, NY",
			image: TbCircleLetterB,
			date: [new Date("2023-01-10"), new Date()],
			tech: ["C++"]
		},
		{
			title: "Content Stack, Software Engineer Intern",
			location: "Remote",
			image: SiContentstack,
			date: [new Date("2024-06-10"), new Date()],
		}
	]

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

		<div id="experiences">
			<Timeline experiences={experiences}/>

		</div>

	</div>
	)
}

export default About