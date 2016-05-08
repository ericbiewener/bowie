export const DependencyActions = {
	INSTALLING_DEPENDENCIES: 'INSTALLING_DEPENDENCIES',
	DEPENDENCIES_INSTALLED: 'DEPENDENCIES_INSTALLED',
	INTERNET_IS_DISCONNECTED: 'INTERNET_IS_DISCONNECTED',
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