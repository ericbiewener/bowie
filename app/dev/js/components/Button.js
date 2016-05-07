import React from 'react'

import {slugify} from 'js/utils'


const Button = ({onClick, text, className}) => (
	<button 
		className={`${className} ${slugify(text)}`}
		onClick={onClick}>
		{text}
	</button>
)

export default Button