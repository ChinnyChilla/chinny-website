import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

interface Props {
	params: any
}
function withParams(Component: any) {
	return (props: any) => <Component {...props} params={useParams()} />;
}
class MusicQueue extends Component<Props> {
	public state: any = {
		queue: {}
	}
	public serverid = this.props.params.serverid
	ws = new WebSocket(`wss://localhost:443/music-queues?id=${this.serverid}`)
	
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
	renderFirstTrack(queue: any) {
		console.log(this.state.queue)
		const track = queue.firstTrack
		return (
			<div>
				<div id="currently-playing">
					<div id='song-name-1'><span>{track.title}</span></div>
					<div id='progress-bar'></div>
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
			</div>
		)
	}
	componentDidUpdate(prevProp: Props, prevState: any) {
		if (prevState.queue !== this.state.queue) {
			console.log("Queue changed")
		}
	}
	
	renderTitle() {
		if (this.state.queue?.channelName === undefined) { return <div id="title">No Current Queue in this Server</div>}
		
		return <div id="title">Music Queue for {this.state.queue.channelName}</div>

	}
	render() {
		return(
			<div>
				<div>

				{this.renderTitle()}
				<div>

				{/* {this.renderFirchstTrack(this.state.queue)} */}
				</div>
				</div>
			</div>
		)
	}

}

export default withParams(MusicQueue)