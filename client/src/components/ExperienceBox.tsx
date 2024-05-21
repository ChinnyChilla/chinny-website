import React from 'react';
import { IconType } from 'react-icons';
import { FaPython, FaJs, FaReact, FaNodeJs, FaGithub, FaDatabase, FaCss3, FaHtml5 } from 'react-icons/fa6'
import { BsFiletypeXml } from 'react-icons/bs'
import { PiFileCpp } from 'react-icons/pi'
import { Tooltip } from 'react-tooltip';

import './ExperienceBox.css';
import 'react-tooltip/dist/react-tooltip.css';

interface ExperienceBoxProps {
  title: string;
  Image: IconType;
  description?: string[];
  location?: string;
  date?: Date[];
  imageOnRight?: boolean;
  tech?: string[];
}

// create a dictionary that maps tech to the corresponding font awesome ic

const ExperienceBox: React.FC<ExperienceBoxProps> = ({title, Image, location, description, tech, date, imageOnRight}) => {
	interface TechIconMap {
		[key: string]: IconType;
	}

	const techIconMap: TechIconMap = {
		"Python": FaPython,
		"JavaScript": FaJs,
		"React": FaReact,
		"Node.JS": FaNodeJs,
		"XML": BsFiletypeXml,
		"HTML": FaHtml5,
		"CSS": FaCss3,
		"PostgresSQL": FaDatabase,
		"git": FaGithub,
		"C++": PiFileCpp,
	};
	return (
		<div id="experience">
			{!imageOnRight && <Image className="experience-image-left" />}
			<div className={`experience-content ${imageOnRight ? 'experience-content-right' : ''}`}>
				<span className="experience-title" >
					{title}
				</span>
				{location && <span className="experience-location">{location}</span>}
				{date && <span className="experience-date">
					{date[0].toLocaleDateString()} - {date[1].toLocaleDateString()}
					</span>}
				{description && description.map((line, index) => {
					return <p key={index} className="experience-description">{line}</p>
				})}
				
				<Tooltip id="experience-tooltip" />
				<div className="experience-tech">
					{tech && tech.map((techName, index) => {
						const Icon = techIconMap[techName];
						if (!Icon) return null;
						return (
							
							<div key={index} className="tech-item" data-tooltip-id="experience-tooltip" data-tooltip-content={techName}>
								<Icon />
							</div>
						)
					})}
				</div>
			</div>
			{imageOnRight && <Image className="experience-image-right" />}
		</div>
	)
}

export default ExperienceBox;