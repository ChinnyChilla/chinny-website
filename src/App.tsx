import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Navbar from './components/topnav';

import Home from './pages/main/Home'
import YoutubeDownloader from './pages/projects/youtube-downloader';
function App() {
  return (
	<BrowserRouter>
		<Navbar />
		<Routes>
			<Route path="/" element={<Home />}/>
			<Route path="/youtubeVideo" element={<YoutubeDownloader />}/>
		</Routes>
	</BrowserRouter>
  );
}

export default App;
