import React from 'react'


const NumberIncrementer = ({number, onClick}) => (
	<div className='number-incrementer'>
		<button onClick={() => onClick(++number)}  className='increment'></button>
		<div className='number'>{number}</div>
		<button onClick={() => onClick(--number)} className='decrement'></button>
	</div>
)

export default NumberIncrementer