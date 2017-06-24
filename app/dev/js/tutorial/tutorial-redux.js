export const TutorialActions = {
	START_TUTORIAL: 'START_TUTORIAL',
	END_TUTORIAL: 'END_TUTORIAL',
	CHANGE_TUTORIAL_TEXT: 'CHANGE_TUTORIAL_TEXT',
	HIDE_TUTORIAL_TEXT: 'HIDE_TUTORIAL_TEXT',
}


export const TutorialActionCreators = {
	startTutorial: () => ({
		type: TutorialActions.START_TUTORIAL
	}),

	endTutorial: state => ({
		type: TutorialActions.END_TUTORIAL,
		state
	}),

	changeTutorialText: text => ({
		type: TutorialActions.CHANGE_TUTORIAL_TEXT,
		text
	}),

	hideTutorialText: () => ({
		type: Actions.HIDE_TUTORIAL_TEXT,
	}),
}


export function isRunningTutorial(state=false, action) {
	// Doesn't need to respond to END_TUTORIAL because the cachedState
	// will automatically take care of that
	if (action.type === TutorialActions.START_TUTORIAL) return true
	return state
}

export function tutorialText(state='', action) {
	return action.type === TutorialActions.CHANGE_TUTORIAL_TEXT
				? action.text
				: state
}

export function isShowingTutorialText(state=false, action) {
	return action.type === TutorialActions.CHANGE_TUTORIAL_TEXT
}