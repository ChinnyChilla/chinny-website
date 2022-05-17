import React, { Component } from 'react'
import App from '../../App'
import './youtube-downloader.css'

interface State {
	youtubeLink: string
}
class youtubeDownloader extends Component {
	public state: State = {
		youtubeLink: ""
	}

	handleLinkChange = (event: { target: { value: any; }; }) => {
		this.setState({youtubeLink: event.target.value})
	}
	searchVideo = (e: { preventDefault: () => void; }) => {
		e.preventDefault()
		console.log(this.state.youtubeLink)
		fetch(`${App.serverIP}/api/getYoutubeData?link=${this.state.youtubeLink}`).then(res => res.json()).then(data => {
			console.log(data)
			console.log(JSON.parse(data))
		})
	}
	render() {
		return (
			<div className="youtubeDownloader">
				<form onSubmit={this.searchVideo}>
					<h2>Insert youtube link below:</h2>
					<input type="text" name="youtubeVideo" onChange={this.handleLinkChange} value={this.state.youtubeLink}/>
					<button type="submit">Submit</button>
					</form>
			</div>
		)
	}
}

export default youtubeDownloader