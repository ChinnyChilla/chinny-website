import React from 'react';

function Home() {
  return (
    <div className="App">
		<div className="body">
      <p>Hopefully this will be a better version of my previous website :D</p>
			  <img src={process.env.PUBLIC_URL + '/korone.gif'} alt="stupid thing wont load" width="250"></img>
      <p>- Dylan cook</p>
      <p>Testing</p>
		</div>
    </div>
  );
}

export default Home;
