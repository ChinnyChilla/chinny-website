import React from 'react'


function About() {
	return (<div>
		<img src={process.env.PUBLIC_URL + '/korone.gif'} alt="stupid thing wont load" width="250"></img>
		<p>- Dylan cook</p>
	</div>
	)
}

export default About