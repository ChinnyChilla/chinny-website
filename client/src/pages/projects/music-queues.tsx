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
	ws = new WebSocket(`wss://chinny.net/music-queues?id=${this.serverid}`)

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
			if (difference < -200) {
				this.setState({...this.state, progressClass: "complete-song"})
				return document.documentElement.style.setProperty('--progress-percent', "0")
			}
			const contentstring = this.changeTimeFormat(this.state.queue.firstTrack.durationMS - difference)
			this.setState({ ...this.state, progressContent: contentstring })
			const str = (Math.abs(difference - this.state.queue.firstTrack.durationMS) / this.state.queue.firstTrack.durationMS).toString()
			document.documentElement.style.setProperty('--progress-percent', str)
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

	componentDidUpdate(prevProp: Props, prevState: any) {
		if (prevState.queue !== this.state.queue) {
			if (this.state.progressClass === "complete-song") {
				this.setState({ ...this.state, progressClass: "end-song" })
			}
		}
	}	
	componentWillUnmount() {
		clearInterval(this.state.progressInterval)
	}
	renderTitle() {
		if (this.state.queue?.channelName === undefined) { return <div id="title">No Current Queue in this Server</div> }

		return <div id="title">Music Queue for {this.state.queue.channelName}</div>

	}
	renderFirstTrack() {
		const queue = this.state.queue
		if (!queue|| queue.deleted) {return (<div></div>)}
		const track = queue.firstTrack
		var trackURL = track.url
		var source = 'Other'
		const YOUTUBE_REGEX = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/
		const SPOTIFY_REGEX = /^(https: \/\/open.spotify.com\/user\/spotify\/playlist\/|spotify:user:spotify:playlist:)([a-zA-Z0-9]+)(.*)$/
		if (YOUTUBE_REGEX.test(track.url)) {
			source = "Youtube"
			const timeNow = new Date();
			const seconds = Math.floor((this.state.queue.firstTrack.durationMS - (this.state.queue.timeSongFinish - timeNow.getTime() + 1000)) / 1000)
			trackURL = trackURL + `&t=${seconds}`
		} else if (SPOTIFY_REGEX.test(track.url)) {
			source = "Spotify"
		}
		return(<div>
				<div className={queue.paused?"alert-info-active":"alert-info"}><span>INFO: This queue is currently paused</span></div>
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
						<div className='info-item'><a className='link' target="_blank" href={trackURL} rel="noreferrer"><span><u>{source}</u></span></a></div>
						</div>
					</div>
				</div>
			</div>)
	}
	
	renderQueue() {
		const queue = this.state.queue
		if (!queue || queue.deleted) { return (<div></div>) }
		const queueSongs = this.state.queue.tracks
		return queueSongs.map((song: any, index: any) => {
			return(
				<div className="queue-song">
					<div className="index">{index + 1}.</div>
					<div className="column queue-column-left">
						<div className="queue-thumbnail-parent">
							<a className='link' target="_blank" href={song.url} rel="noreferrer"><img src={song.thumbnail} className="queue-thumbnail" alt="thumbnail" /></a>
							</div>
					</div>
					<div className="column queue-column-right">
						<a className='link' target="_blank" href={song.url} rel="noreferrer">
							<div className="queue-title"><span>{song.title}</span></div>
						</a>
						<div className="queue-duration"><span>{this.changeTimeFormat(song.durationMS)}</span></div>
					</div>
				</div>
			)
		})
	}
	
	render() {
		return(
			<>
				{this.renderTitle()}
				{this.renderFirstTrack()}
				<div id="split-queue" style={{fontSize: '5vmin', textAlign: 'center'}}>The rest of the queue...</div>
				<div id="queue">
				{this.renderQueue()}
				</div>
			</>
		)
	}

}

export default withParams(MusicQueue)
