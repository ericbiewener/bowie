export const DependencyActions = {
	INSTALLING_DEPENDENCIES: 'INSTALLING_DEPENDENCIES',
	INSTALLING_DEPENDENCY: 'INSTALLING_DEPENDENCY',
	DEPENDENCIES_INSTALLED: 'DEPENDENCIES_INSTALLED',
	INTERNET_IS_DISCONNECTED: 'INTERNET_IS_DISCONNECTED',
}


export const DependencyActionCreators = {
	installingDependency: dependencyMessage => ({
		type: DependencyActions.INSTALLING_DEPENDENCY,
		dependencyMessage,
	}),
}


export function dependencyStatus(state='', action) {
	switch (action.type) {
		case DependencyActions.INSTALLING_DEPENDENCIES:
		case DependencyActions.DEPENDENCIES_INSTALLED:
		case DependencyActions.INTERNET_IS_DISCONNECTED:
			return action.type
	}
	return state
}

export function dependencyBeingInstalled(state='', action) {
	switch (action.type) {
		case DependencyActions.INSTALLING_DEPENDENCY:
			return action.dependencyMessage
			
		case DependencyActions.DEPENDENCIES_INSTALLED:
			return ''
	}
	return state
}