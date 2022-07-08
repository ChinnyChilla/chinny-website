import React, { Component } from 'react'


class MusicQueue extends Component {
	public state: any = {
		queue: undefined
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

export default MusicQueue