import React from 'react'

import {slugify} from 'js/utils'


const ActiveLink = ({children, isActive, onClick, tagName, className}) => {
	let TagName = tagName || 'a',
	    textSlug = slugify(children),
	    active = isActive ? 'active' : ''

	return(
		<TagName
			className={`${active} ${className} ${className}-${textSlug}`}
			onClick={!isActive && onClick}>
			{children}
		</TagName>
	)
}

export default ActiveLink