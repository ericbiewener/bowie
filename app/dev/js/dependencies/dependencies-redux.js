import store from 'js/store/store'

import maybeShowTutorial from 'js/tutorial/maybeShowTutorial'


export const DependencyActions = {
	INSTALL_DEPENDENCIES: 'INSTALL_DEPENDENCIES',
	INSTALL_DEPENDENCY: 'INSTALL_DEPENDENCY',
	UPDATE_DEPENDENCY_INSTALL_PROGRESS: 'UPDATE_DEPENDENCY_INSTALL_PROGRESS',
	FINISHED_INSTALLING_DEPENDENCIES: 'FINISHED_INSTALLING_DEPENDENCIES',
	INTERNET_IS_DISCONNECTED: 'INTERNET_IS_DISCONNECTED',
}


// Takes the place of standard Action Creators
export function updateDependencyStatus(type, message) {
	store.dispatch({
		type: type,
		message: message
	})
}


export function dependencyStatus(state='', action) {
	switch (action.type) {
		case DependencyActions.INSTALL_DEPENDENCIES:
		case DependencyActions.FINISHED_INSTALLING_DEPENDENCIES:
		case DependencyActions.INTERNET_IS_DISCONNECTED:
			return action.type
	}
	return state
}

export function dependencyBeingInstalled(state='', action) {
	switch (action.type) {
		case DependencyActions.INSTALL_DEPENDENCY:
			return action.message
			
		case DependencyActions.FINISHED_INSTALLING_DEPENDENCIES:
			return ''
	}
	return state
}

export function updateDependencyInstallProgress(state='', action) {
	switch (action.type) {
		case DependencyActions.UPDATE_DEPENDENCY_INSTALL_PROGRESS:
			return action.message
			
		case DependencyActions.INSTALL_DEPENDENCY:
		case DependencyActions.FINISHED_INSTALLING_DEPENDENCIES:
			return ''
	}
	return state
}


export const dependencyMiddleware = ({ getState }) => next => action => {
	const nextState = next(action)

	if (action.type === DependencyActions.FINISHED_INSTALLING_DEPENDENCIES) {
		maybeShowTutorial()
	}

	return nextState
}