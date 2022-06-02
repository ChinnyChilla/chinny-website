import React, {Component} from "react"
import { Link, Route } from "react-router-dom";
import './projectstyles.css'
import {lazily} from "react-lazily"
import App from '../../App'

class ProjectsPage extends Component {
    public readonly projectList = App.projectList
    public createProjectBlock(props: any) {
        return (
            <div className="projectBlock">
                <Link to={props.link}>
                    <h3>{props.name}</h3>
                </Link>
            </div>
        )
    }  

    public renderBlocks = () => {
        return this.projectList.map((project, index) => {
            return (
				<div key={project}>
					{this.createProjectBlock({name: project, link: project.replace(" ", "-").toLowerCase()})}
				</div>
			)
        })
    }
    async renderRoutes() {
        return this.projectList.map(async (project: string, index) => {
            const projectName = project.replace(' ', "-").toLowerCase()
            const element = lazily(() =>
                import(`../projects/${project}`)
            )
            return <Route path={`/projects/${projectName}`} element={element} />
        })
    }
    render() {
        
        return (
            <div className="body">
                <h1>Projects List</h1>
                {this.renderBlocks()}
                
            </div>
        )
    }
}

export default ProjectsPage;