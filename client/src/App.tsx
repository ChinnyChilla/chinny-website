import React, { Component, Suspense } from 'react';
import { Route, BrowserRouter, Routes, useParams, Link } from 'react-router-dom';
import Navbar from './components/topnav';

import Home from './pages/main/Home'
import ProjectsPage from './pages/main/Projects';

class App extends Component {
	public static readonly projectList = [
		'Kinematics Calculator',
		'Youtube Downloader',
		'testing'
	]
	public readonly testing = App.projectList

	project = () => {
		const params = useParams()
		const Project = this.getProject(params.projectName!)
		return <div>
			<Suspense fallback={<div>Loading...</div>}>

			<Project />
			</Suspense>
		</div>

	}
	getProject(id: string) {
		
		const component = React.lazy(() =>
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
					<Route path='/projects/:projectName' element={<this.project/>}/>
				</Routes>
			</BrowserRouter>
			
		);
	}
}

export default App;
