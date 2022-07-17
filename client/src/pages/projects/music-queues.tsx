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
	public state: any = {
		queue: {},
		html: null
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
	}
	renderQueue(queue: any) {
		const track = queue.firstTrack
		this.setState({
			...this.state, html: (<div>
				<div id="currently-playing">
					<div className='progress-bar'></div>
					<div id='song-name-1'><span>{track.title}</span></div>
					<div className='column left'>
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
									<span>{track.source}</span>
								</div>
							</div>
						</div>
					</div>
					<div className='column right'>

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