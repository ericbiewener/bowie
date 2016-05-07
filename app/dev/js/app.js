import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from 'js/redux/store'
import {openTutorial} from 'js/tutorial/playback-controls'
import Root from 'js/root/RootContainer'


render(
	<Provider store={store}>
		<Root />
	</Provider>,
	document.getElementById('root')
)

if (!localStorage.getItem('suppressTutorial')) {
	localStorage.setItem('suppressTutorial', true)
	openTutorial(true)
}

	openTutorial(true)
