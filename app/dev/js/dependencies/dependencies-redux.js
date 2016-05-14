export const DependencyActions = {
	INSTALLING_DEPENDENCIES: 'INSTALLING_DEPENDENCIES',
	INSTALLING_DEPENDENCY: 'INSTALLING_DEPENDENCY',
	DEPENDENCY_INSTALL_PROGRESS: 'DEPENDENCY_INSTALL_PROGRESS',
	DEPENDENCIES_INSTALLED: 'DEPENDENCIES_INSTALLED',
	INTERNET_IS_DISCONNECTED: 'INTERNET_IS_DISCONNECTED',
}


export const DependencyActionCreators = {
	installingDependency: dependencyMessage => ({
		type: DependencyActions.INSTALLING_DEPENDENCY,
		dependencyMessage,
	}),

	dependencyInstallProgress: cliMessage => ({
		type: DependencyActions.DEPENDENCY_INSTALL_PROGRESS,
		cliMessage,
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

export function dependencyInstallProgress(state='', action) {
	switch (action.type) {
		case DependencyActions.DEPENDENCY_INSTALL_PROGRESS:
			return action.cliMessage
			
		case DependencyActions.INSTALLING_DEPENDENCY:
		case DependencyActions.DEPENDENCIES_INSTALLED:
			return ''
	}
	return state
}