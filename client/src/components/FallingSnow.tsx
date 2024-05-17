import React, { useEffect } from 'react';
import './FallingSnow.css';

const FallingSnow: React.FC = () => {
	useEffect(() => {
		const numStars = 50;
		const shootingStarsContainer = document.querySelector('.shooting-stars');

		if (shootingStarsContainer) {
			for (let i = 0; i < numStars; i++) {
				const star = document.createElement('div');
				star.classList.add('star');
				star.style.top = `${Math.random() * 50}vh`;
				star.style.left = `${Math.random() * 100}vw`;
				star.style.animationDelay = `${Math.random() * 10}s`;
				star.style.animationDuration = `${Math.random() * 2 + 10}s`;
				shootingStarsContainer.appendChild(star);
			}
		}
	}, []);

	return <div className="shooting-stars"></div>;
};

export default FallingSnow;