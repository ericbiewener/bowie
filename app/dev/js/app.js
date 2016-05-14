import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from 'js/redux/store'
import checkDependencies from 'js/dependencies/check-dependencies'
import {DependencyActions} from 'js/dependencies/dependencies-redux'
import {openTutorial} from 'js/tutorial/playback-controls'
import Root from 'js/root/RootContainer'


render(
	<Provider store={store}>
		<Root />
	</Provider>,
	document.getElementById('root')
)

export function dependencyStatusUpdate(status) {
	store.dispatch({type: status})
	
	if (status === DependencyActions.DEPENDENCIES_INSTALLED) {
		maybeShowTutorial()
	}
}

function maybeShowTutorial() {
	if (localStorage.getItem('suppressTutorial')) return
	localStorage.setItem('suppressTutorial', true)
	openTutorial(true)
}

checkDependencies()