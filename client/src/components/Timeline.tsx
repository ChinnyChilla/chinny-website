import React from 'react';
import ExperienceBox from './ExperienceBox'; // Assuming ExperienceBox is in the same directory

import './Timeline.css';

interface ExperienceProps {
  title: string;
  location: string;
  image: any;
  date: Date[];
  tech: string[];
}

const Timeline = ({ experiences }: any ) => {

	const positions: any = [];
	const calculateCurvePath = (numItems: any) => {
		const pathData = [];
		const width = window.innerWidth;
		const centerX = width / 2;
		const curveIntensity = 0.3; // Adjust the curve intensity as needed

		for (let i = 0; i < numItems+1; i++) {
			const startY = i * 500; // Adjust the vertical spacing as needed 
			const midX = i % 2 === 0 ? width * 2 * (1 - curveIntensity) + 100 : -width * 1.5 * curveIntensity;
			const midY = startY + 250; // Adjust the vertical position of the curve
			const endY = startY + 500; // Adjust the end point vertical position

			const curveData = `M ${centerX},${startY} Q ${midX},${midY} ${centerX},${endY}`;
			pathData.push(curveData);

			const boxX = 100;
			const boxY = midY - 74 - (135 * i)
			positions.push({x: boxX, y: boxY})
		}

		return pathData.join(' ');
	};

	const curvePath = calculateCurvePath(experiences.length);
	const totalHeight = 500 * experiences.length;

	return (
		<div className="timeline-container" style={{height: totalHeight}}>
			<div className="timeline-line">
				<svg style={{height: '100%', width: '100%'}}>
					<path d={curvePath} stroke="white" strokeWidth="10" fill="none" />
				</svg>
			</div>
			{experiences.map((experience: ExperienceProps, index: number) => (
				<div key={index} className="timeline-item">
					<div style={{ position: 'absolute', [index % 2 === 0 ? 'right' : 'left']: positions[index].x, top: positions[index].y}} className={`experience-box ${index % 2 !== 0 ? 'experience-box-left' : 'experience-box-right'}`}>
						<ExperienceBox
							title={experience.title}
							location={experience.location}
							tech={experience.tech}
							Image={experience.image}
							date={experience.date}
							imageOnRight={index % 2 === 0} // Alternate image position
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default Timeline;