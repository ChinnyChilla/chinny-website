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
		this.timeTimer = this.timeTimer.bind(this)
	}
	public progressTimer:any
	public timeInterval: any
	public state: any = {
		queue: {},
		html: null,
		progressContent: 0
	}
	public serverid = this.props.params.serverid
	ws = new WebSocket(`ws://localhost:3000/music-queues?id=${this.serverid}`)

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
		this.progressTimer = setInterval(() => {
			
			try {
				
				const timeNow = new Date();
				if (this.state.queue.paused) {
					const percent = this.state.queue.currentStreamTime / this.state.queue.firstTrack.durationMS
					return document.documentElement.style.setProperty('--progress-percent', percent.toString())
				}
				const difference = this.state.queue.timeSongFinish - timeNow.getTime()
				if (difference < 10) {
					document.documentElement.style.setProperty('--progress-content', `"COMPLETE"`)
					document.documentElement.style.setProperty('--text-color', "black")
					document.documentElement.style.setProperty('--progress-color', "rgb(144, 238, 144)")
					document.documentElement.style.setProperty('--progress-height', "30px")
					document.documentElement.style.setProperty('--text-align', "center")
					return document.documentElement.style.setProperty('--progress-percent', "1")
				} else {
					
					
				}
				const str = (Math.abs(difference - this.state.queue.firstTrack.durationMS) / this.state.queue.firstTrack.durationMS).toString()
				document.documentElement.style.setProperty('--progress-percent', str)
			}
			catch {
				console.log("No queue")
			}
		}, 50)
		var timeInterval = setInterval(() => {
			var contentString = this.timeTimer()
			console.log(contentString)
			this.setState({...this.state, progressTime: contentString})
		}, 1000)
		this.setState({...this.state, timeInterval: timeInterval})
	}
	timeTimer(){
		try {
			const timeNow = new Date();
			const difference = this.state.queue.timeSongFinish - timeNow.getTime()
			const contentstring = this.changeTimeFormat(this.state.queue.firstTrack.durationMS - difference)
			document.documentElement.style.setProperty('--progress-content', `"${contentstring}"`)
			return contentstring
		}
		catch (err) {
			console.log(this.state)
			console.log("no queue")
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
		clearInterval(this.progressTimer)
		clearInterval(this.state.timeInterval)
	}
	renderQueue(queue: any) {
		if (!queue || queue.deleted) {return this.setState({...this.state, html: null})}
		const track = queue.firstTrack
		var source = 'Other'
		const YOUTUBE_REGEX = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/
		const SPOTIFY_REGEX = /^(https: \/\/open.spotify.com\/user\/spotify\/playlist\/|spotify:user:spotify:playlist:)([a-zA-Z0-9]+)(.*)$/
		if (YOUTUBE_REGEX.test(track.url)) {
			source = "Youtube"
		} else if (SPOTIFY_REGEX.test(track.url)) {
			source = "Spotify"
		}
		this.setState({
			...this.state, html: (<div>
				<div id="currently-playing">
					<div className='progress-bar'><span className="floatright">{this.changeTimeFormat(track.durationMS)}</span></div>
					<div id='song-name-1'><span>{track.title}</span></div>
					<div className='column left'>
						<div className='thumbnail-1'><img src={track.thumbnail} alt="thumbnail"/></div>
					</div>
					<div className='column right'>
						<div id='info-box'>
							<div className='column left grid'>
								<div className='row'>
									<span>Author</span>
								</div>
								<div className='row'>
									<span>Source</span>
								</div>
							</div>
							<div className='column right grid'>
								<div className='row'>
									<span>{track.author}</span>
								</div>
								<div className='row'>
									<a className='link' href={track.url}><span><u>{source}</u></span></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>)})
	}
	componentDidUpdate(prevProp: Props, prevState: any) {
		if (prevState.queue !== this.state.queue) {
			console.log("Queue changed")
			console.log("previous: ")
			console.log(prevState.queue)
			console.log("current: ")
			console.log(this.state.queue)
			this.renderQueue(this.state.queue)
			document.documentElement.style.setProperty('--progress-color', "aqua")
			document.documentElement.style.setProperty('--progress-height', "6px")
			document.documentElement.style.setProperty('--text-align', "left")
			document.documentElement.style.setProperty('--text-color', "white")
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
				{this.renderPage()}
				<div>

				</div>
				</div>
			</div>
		)
	}

}

export default withParams(MusicQueue)