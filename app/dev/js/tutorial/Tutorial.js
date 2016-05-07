import React from 'react'


const Tutorial = ({text, next, end}) => (
	<div id='tutorial'>
		<div className='tutorial-text'>
			<div className='text'>{text}</div>
			<a onClick={next} className='next'>Next ›</a>
			<a className='end-tutorial' onClick={end}>Close Tutorial</a>
		</div>
	</div>
)

export default Tutorial