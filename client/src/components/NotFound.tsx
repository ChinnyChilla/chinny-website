import React from "react"
import { Link } from "react-router-dom"

import './NotFound.css'

function NotFound() {
    return(
        <div className="notFoundDiv">
            <h1 className="top h1">404</h1>
            <h1 className="h1">Page not Found</h1>
            <h2 className="h2">Reached a dead end</h2>
            <Link to="/"><div className="home">Go Home</div></Link>
        </div>
    )
}


export default NotFound