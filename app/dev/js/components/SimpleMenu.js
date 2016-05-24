import React from 'react'

import ActiveLink from 'js/components/ActiveLink'


const SimpleMenu = ({listItems, onClicks, className}) => (
	<ul className='simple-menu'>
		{listItems.map((item, i) => (
			<ActiveLink key={i}
				tagName='li'
				className='simple-menu-item'
				isActive={item.isActive}
				onClick={onClicks[i]}>
				{item.text}
			</ActiveLink>
		))}
	</ul>
)

export default SimpleMenu