import React from 'react'

import ActiveLink from 'js/components/ActiveLink'


const SimpleMenu = ({listItems, onClicks, className}) => (
	<ul className='simple-menu'>
		{listItems.map((item, i) => (
			<ActiveLink key={i}
				tagName='li'
				className='simple-menu-item'
				isActive={item.isActive}
				text={item.text}
				onClick={onClicks[i]}
			/>
		))}
	</ul>
)

export default SimpleMenu