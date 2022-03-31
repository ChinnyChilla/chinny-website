import React from 'react';
import korone from '../../assets/korone.gif';
function Home() {
  return (
    <div className="App">
		<div className="body">
      <p>Hopefully this will be a better version of my previous website :D</p>
			  <img src={korone} alt="stupid thing wont load" width="250"></img>
		</div>
    </div>
  );
}

export default Home;
