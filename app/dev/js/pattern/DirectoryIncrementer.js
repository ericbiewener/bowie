import React from 'react'

import NumberIncrementer from 'js/components/NumberIncrementer'


const DirectoryIncrementer = props => (
	<div className='number-incrementer-container'>
		<div>Showing</div>
		<NumberIncrementer {...props} />
		<div>parent directories</div>
	</div>
)

export default DirectoryIncrementer