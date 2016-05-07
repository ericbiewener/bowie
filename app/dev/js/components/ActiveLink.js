import React from 'react'

import {slugify} from 'js/utils'


const ActiveLink = ({isActive, onClick, text, tagName, className}) => {
	let TagName = tagName || 'a',
	    textSlug = slugify(text),
	    active = isActive && 'active'

	return	<TagName
				className={`${active} ${className} ${className}-${textSlug}`}
				onClick={!isActive && onClick}>
				{text}
			</TagName>
}

export default ActiveLink