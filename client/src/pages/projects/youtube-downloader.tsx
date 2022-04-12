import React, { Component } from 'react'
import './youtube-downloader.css'
class youtubeDownloader extends Component {
	public youtubeLink: string = ""

	getValue = (event: { target: { value: any; }; }) => {
		this.youtubeLink  = event.target.value;
	}
	searchVideo = (e: { preventDefault: () => void; }) => {
		e.preventDefault()
		console.log(this.youtubeLink)
		fetch(`/api/getYoutubeData?link=${this.youtubeLink}`).then(res => {
			res.json()
		}).then (data => {
			console.log(data)
		})
	}
	render() {
		return (
			<div className="youtubeDownloader">
				<form onSubmit={this.searchVideo}>
					<input type="text" name="youtubeVideo" onChange={this.getValue} />
					<button type="submit">Submit</button>
					</form>
			
			</div>
		)
	}
}

export default youtubeDownloader