import React, { Component } from 'react'
import './youtube-downloader.css'

interface State {
	youtubeLink: string
	videoDetails: any
	errorVideo: boolean
}
class youtubeDownloader extends Component {
	public state: State = {
		youtubeLink: "",
		videoDetails: [],
		errorVideo: false
	}

	handleLinkChange = (event: { target: { value: any; }; }) => {
		this.setState({...this.state, youtubeLink: event.target.value, errorVideo: false})
	}
	searchVideo = (e: { preventDefault: () => void; }) => {
		e.preventDefault()
		console.log(this.state.youtubeLink)
		fetch(`${process.env.REACT_APP_SERVERIP}/api/getYoutubeData?link=${this.state.youtubeLink}`).then(res => {
			if (!res.ok) {
				console.log("BAD REQUEST")
				return this.setState({...this.state, errorVideo: true})
			}
			console.log(res)
			res.json().then((data:any) => {
				data = JSON.parse(data.videoData).videoDetails
				this.setState({...this.state, videoDetails: this.state.videoDetails.push(data)})
			})
		})
	}
	render() {
		return (
			<div className="youtubeDownloader">
				<form onSubmit={this.searchVideo}>
					<h2>Insert youtube link below:</h2>
					<input type="text" name="youtubeVideo" onChange={this.handleLinkChange} value={this.state.youtubeLink}/>
					<button type="submit">Submit</button>
					<span hidden={!this.state.errorVideo} className="yd-fail">This video was not found</span>
					</form>
			</div>
		)
	}
}

export default youtubeDownloader