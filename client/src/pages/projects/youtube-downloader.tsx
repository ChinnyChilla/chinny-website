import React, { Component } from 'react'
import './youtube-downloader.css'

interface DownloaderState {
	youtubeLink: string
	failed: boolean
	videoDetails: any
	showVideo: any
	serverIP: string
}

class youtubeDownloader extends Component {
	constructor(props: any) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	public state: DownloaderState = {
		youtubeLink: "",
		failed: false,
		videoDetails: [],
		showVideo: (<div></div>),
		serverIP: process.env.REACT_APP_SERVERIP!
	}
	handleLinkChange = (event: { target: { value: any; }; }) => {
		this.setState({...this.state, youtubeLink: event.target.value})
	}
	searchVideo = (e: { preventDefault: () => void; }) => {
		return new Promise((resolve, reject) => {
			fetch(`/api/getYoutubeData?link=${this.state.youtubeLink}`).then(res => {
				if (!res.ok) {
					reject("error")
				}
				res.json().then((data:any) => {
					data = JSON.parse(data.videoData)
					console.log(data)
					resolve(data)
				})
			})
		})
	}
	handleSubmit(e: any) {
		e.preventDefault()
		this.setState({...this.state, showVideo: (<div className="spin">Fetching Video</div>)})
		this.searchVideo(e).then(async (res: any) => {
			await this.setState({ ...this.state, videoDetails: res })
			this.setState({ ...this.state, showVideo: (<div>
				<div className="section">
				<h4 id="videoTitle">{res.title}</h4>
				<h6>{this.state.videoDetails.author.name}</h6>
				</div>
				<div className="section">
					<a href={`${this.state.videoDetails.video_url}`}><img alt="video thumbnail" src={res.thumbnails[0].url}></img></a>
				</div>
			
				<a href={`/api/downloadYoutubeVideo?link=${this.state.youtubeLink}`} download={this.state.videoDetails.title + ".mp3"}><button className="btnDownload">Download</button></a>
				</div>) })
		}).catch(err => {
			this.setState({ ...this.state, showVideo: (<div className="error">Video not found</div>) })
		})
	}
	render() {
		return (
			<div className="youtubeDownloader">
				<form onSubmit={this.handleSubmit}>
					<h2>Insert youtube link below:</h2>
					<input type="text" name="youtubeVideo" onChange={this.handleLinkChange} value={this.state.youtubeLink}/>
					<button type="submit" id='submit'>Submit</button>
					</form>
				<div className="video">{this.state.showVideo}</div>
			</div>
		)
	}
}

export default youtubeDownloader