import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

function withParams(Component: any) {
	return (props: any) => <Component {...props} params={useParams()} />;
}
class MusicQueue extends Component {
	public state: any = {
		queue: undefined
	}
	public serverid = this.props.params.serverid
	ws = new WebSocket(`ws:/localhost:3000/music-queues/${this.serverid}`)
	componentDidMount() {
		console.log(this.props.params)
		this.ws.onopen = () => {
			console.log("Connected to server")
		}
		this.ws.onmessage = (evt) => {
			const message = JSON.parse(evt.data).queue
			console.log(message)
			this.setState({queue: message})
		}
	}
	renderFirstTrack(track: any) {
		return(
			<div>
				<div id="currently-playing">
					<div id='song-name-1'><span>{track.name}</span></div>
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
	render() {
		return(
			<div>
				<div id="Title"></div>
			</div>
		)
	}

}

export default withParams(MusicQueue)