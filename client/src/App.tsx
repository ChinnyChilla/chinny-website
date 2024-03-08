import React, { Component, Suspense } from 'react';
import { Route, BrowserRouter, Routes, useParams } from 'react-router-dom';
import Navbar from './components/topnav';

import Home from './pages/main/Home'
import About from './pages/main/About'
import ProjectsPage from './pages/main/Projects';
import NotFound from './components/NotFound'
import MusicQueue from './pages/projects/music-queues';

import LoadingRing from './components/loadingCircle';

class App extends Component {
	public foundProject = false
	public static readonly projectList = [
		'Kinematics Calculator',
		'Youtube Downloader',
		'testing',
		'Electrical Calculator'
	]
	public readonly testing = App.projectList

	project = () => {
		const params = useParams()
		const Project = this.getProject(params.projectName!)
		return (<div>
			<Suspense fallback={<LoadingRing />}>

			<Project />
			</Suspense>
		</div>)
	}
	getProject(id: string) {
		this.foundProject = true
		var component;
		try {
			require(`./pages/projects/${id}`)
		} catch {
			this.foundProject = false
		}

		if (this.foundProject) {
			component = React.lazy(() =>
				import(`./pages/projects/${id}`).catch(err => {
					console.log("Beofre" + this.foundProject)
				})
			)
		} else {
			component = React.lazy(() =>
				import("./components/NotFound")
			)
		}
		return component
	}

	render() {
		return (
			
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path='/projects' element={<ProjectsPage />}/>
					<Route path='/about' element={<About />}></Route>
					<Route path='/projects/:projectName' element={<this.project/>}/>
					<Route path='music-queues/:serverid' element={<MusicQueue />}></Route>
					<Route path="*" element={<NotFound />}/>
				</Routes>
			</BrowserRouter>
			
		);
	}
}

export default App;
