import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import './music-queues.css'
interface Props {
	params: any
	queueRef: any
}
function withParams(Component: any) {
	return (props: any) => <Component {...props} params={useParams()} />;
}
class MusicQueue extends Component<Props> {
	constructor(props: any) {
		super(props);
		this.progressTimer = this.progressTimer.bind(this)
	}
	public timeInterval: any
	public state: any = {
		progressClass: "",
		queue: undefined,
		html: null,
		progressContent: ""
	}
	public serverid = this.props.params.serverid
	ws = new WebSocket(`wss://localhost:3000/music-queues?id=${this.serverid}`)

	componentDidMount() {
		
		this.ws.onopen = () => {
			console.log("Connected to server")
		}
		this.ws.onmessage = (evt) => {
			const message = JSON.parse(evt.data)
			if (message.category === "queue") {
				this.setState({...this.state, queue: message.data})
				console.log("Current state")
				console.log(this.state)
			}
		}
		this.ws.onerror = (err) => {
			console.error(err)
		}
		this.ws.onclose = (evt) => {
			console.log("Closed")
			console.log(evt)

		}
		var progressInterval = setInterval(() => {this.progressTimer()}, 100)
		this.setState({...this.state, progressInterval: progressInterval})
		
	}
	progressTimer() {
		try {

			const timeNow = new Date();
			if (this.state.queue.paused) {
				const percent = this.state.queue.currentStreamTime / this.state.queue.firstTrack.durationMS
				return document.documentElement.style.setProperty('--progress-percent', percent.toString())
			}
			const difference = this.state.queue.timeSongFinish - timeNow.getTime() + 1000
			if (difference < 0) {
				this.setState({...this.state, progressClass: "complete-song"})
				return document.documentElement.style.setProperty('--progress-percent', "0")
			}
			const str = (Math.abs(difference - this.state.queue.firstTrack.durationMS) / this.state.queue.firstTrack.durationMS).toString()
			document.documentElement.style.setProperty('--progress-percent', str)

			const contentstring = this.changeTimeFormat(this.state.queue.firstTrack.durationMS - difference)
			this.setState({ ...this.state, progressContent: contentstring })
		}
		catch {
		}

	}
	changeTimeFormat(time: number) {
		function pad2(num: number) {
			return num.toString().padStart(2, '0')
		}
		var seconds = Math.floor(time / 1000)
		var minutes = Math.floor(seconds / 60)
		var hours = Math.floor(minutes / 60)
		seconds = seconds % 60
		minutes = minutes % 60
		if (hours === 0) {
			return `${pad2(minutes)}:${pad2(seconds)}`
		} else {
			return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`
		}
	}
	componentWillUnmount() {
		clearInterval(this.state.progressInterval)
	}
	renderFirstTrack() {
		const queue = this.state.queue
		if (!queue|| queue.deleted) {return (<div></div>)}
		const track = queue.firstTrack
		var source = 'Other'
		const YOUTUBE_REGEX = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/
		const SPOTIFY_REGEX = /^(https: \/\/open.spotify.com\/user\/spotify\/playlist\/|spotify:user:spotify:playlist:)([a-zA-Z0-9]+)(.*)$/
		if (YOUTUBE_REGEX.test(track.url)) {
			source = "Youtube"
		} else if (SPOTIFY_REGEX.test(track.url)) {
			source = "Spotify"
		}
		return(<div>
				<div id="currently-playing">
					<div className={"progress-bar " + this.state.progressClass}>
					</div>
				<div className='time'>
					<div className={"floatleft " + this.state.progressClass}><span>{this.state.progressContent}</span></div>
					<div className={"float " + this.state.progressClass}><span>{this.state.progressClass === "complete-song" ? "COMPLETE" : ""}</span></div>
					<div className={"floatright " + this.state.progressClass}><span>{this.changeTimeFormat(track.durationMS)}</span></div>
				</div>
					<div id='song-name-1'><span>{track.title}</span></div>
					<div className='column left'>
						<div className='thumbnail-1'><img src={track.thumbnail} alt="thumbnail"/></div>
					</div>
					<div className='column right'>
						<div id='info-box'>
							<div className="info-item"><b>Author</b></div>
							<div className='info-item'>{track.author}</div>
							<div className="info-item"><b>Source</b></div>
							<div className='info-item'><a className='link' target="_blank" href={track.url} rel="noreferrer"><span><u>{source}</u></span></a></div>
						</div>
					</div>
				</div>
			</div>)
	}
	componentDidUpdate(prevProp: Props, prevState: any) {
		if (prevState.queue !== this.state.queue) {
			if (this.state.progressClass === "complete-song") {
				this.setState({ ...this.state, progressClass: "end-song" })
			}
		}
	}	
	renderTitle() {
		if (this.state.queue?.channelName === undefined) { return <div id="title">No Current Queue in this Server</div>}
		
		return <div id="title">Music Queue for {this.state.queue.channelName}</div>

	}
	renderPage() {
		return this.state.html
	}
	render() {
		return(
			<div>
				<div>
				{this.renderTitle()}
				</div>
				<div>
				{this.renderFirstTrack()}

				</div>
			</div>
		)
	}

}

export default withParams(MusicQueue)