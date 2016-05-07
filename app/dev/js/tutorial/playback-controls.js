import store from 'js/redux/store'
import {TutorialActionCreators} from 'js/tutorial/tutorial-redux'
import recordedActions from 'js/tutorial/recorded-actions'


let {startTutorial, endTutorial} = TutorialActionCreators,
    sequenceIndex = 0,
    finalSequenceIndex = recordedActions.main.length - 1,
    cachedState

export function playNextSequence() {
	let sequence = recordedActions.main[sequenceIndex]

	if (sequenceIndex <= finalSequenceIndex) {
		sequenceIndex++
		playAction(sequence)
	} else {
		closeTutorial()
	}
}

function playAction(sequence, i=0) {
	let action = sequence[i]

	// At end of sequence
	if (!action) return
	
	setTimeout(() => {
		// Tutorial may have gotten closed before this runs
		if (!store.getState().isRunningTutorial) return
		store.dispatch(action)
		playAction(sequence, ++i)
	}, action.timing)
}

export function openTutorial(showWelcomeSequence) {
	cachedState = store.getState()
	store.dispatch(startTutorial())

	recordedActions.init.forEach(a => store.dispatch(a))

	// Avoid type coercion because click handlers will pass in the event object
	if (showWelcomeSequence === true) {
		playAction(recordedActions.welcome)
	} else {
		playNextSequence()
	}
}

export function closeTutorial() {
	sequenceIndex = 0
	store.dispatch(endTutorial(cachedState))
}