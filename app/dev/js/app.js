import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from 'js/store/store'
import checkDependencies from 'js/dependencies/check-dependencies'
import {DependencyActions, DependencyActionCreators} from 'js/dependencies/dependencies-redux'
import Root from 'js/root/RootContainer'


render(
	<Provider store={store}>
		<Root />
	</Provider>,
	document.getElementById('root')
)

checkDependencies()