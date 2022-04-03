import React, { Component } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Navbar from './components/topnav';

import Home from './pages/main/Home'
import ProjectsPage from './pages/main/Projects';

import YoutubeDownloader from './pages/projects/youtube-downloader';
import KinematicsCalculator from './pages/projects/kinematics-calculator';
class App extends Component {
	public static readonly projectList = [
		'Kinematics Calculator',
		'Youtube Downloader',
		'testing'
	]
	public readonly testing = [
		'Kinematics Calculator',
		'Youtube Downloader',
		'testing'
	]
    public renderProjectFiles = () => {
		return this.testing.map(async (project:string, index) => {
			const projectName = project.replace(' ', "-").toLowerCase()
			const element = React.lazy(() =>
				import(`./pages/projects/${projectName}`)
			)
			return <Route path={`/projects/${projectName}`} element={element} />
		})
	}
	async getProject() {
		const id = window.location.pathname.split("/")[-1]
		const component = await React.lazy(() =>
			import(`./pages/projects/${id}`)
			)
		return component
	}
	render() {
		return (
			
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path='/projects' element={<ProjectsPage />}/>
					<Route path='/projects/youtube-downloader' element={<YoutubeDownloader/>}/>
					<Route path='/projects/kinematics-calculator' element={<KinematicsCalculator/>}/>
				</Routes>
			</BrowserRouter>
		);
	}
}

export default App;
