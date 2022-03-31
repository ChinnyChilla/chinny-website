import React, {Component} from "react"
import { Link, Route } from "react-router-dom";
import './projectstyles.css'
import App from '../../App'
class ProjectsPage extends Component {
    public readonly projectList = App.projectList
    public createProjectBlock(props: any) {
        return (
            <div className="projectBlock">
                <h3>{props.name}</h3>
                <Link to={props.link}>
                    <button type="button">
                        Go to project
                    </button>
                </Link>
            </div>
        )
    }  

    public renderBlocks = () => {
        return this.projectList.map((project, index) => {
            return this.createProjectBlock({name: project, link: project.replace(" ", "-").toLowerCase()})
        })
    }
    async renderRoutes() {
        return this.projectList.map(async (project: string, index) => {
            const projectName = project.replace(' ', "-").toLowerCase()
            const element = React.lazy(() =>
                import(`../projects/${project}`)
            )
            return <Route path={`/projects/${projectName}`} element={element} />
        })
    }
    render() {
        
        return (
            <div className="body">
                {this.renderBlocks()}
                
            </div>
        )
    }
}

export default ProjectsPage;