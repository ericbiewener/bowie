import {createStore, applyMiddleware} from 'redux'

import _ from 'js/lodash-modules'
import combineReducers from 'js/redux/combineReducers'
import {getSongsBeingViewed, hasMappedPatterns, buildRootClass} from 'js/redux/computed-state'
import {originalTags, ioMiddleware} from 'js/io/io-redux'
import {patterns, parentDirectories} from 'js/pattern/pattern-redux'
import {manualTagEdits, tagsBeingViewed} from 'js/tag-editor/tag-editor-redux'
import {isRunningTutorial, tutorialText, isShowingTutorialText, TutorialActions} from 'js/tutorial/tutorial-redux'
import {TagVersion} from 'js/tag-editor/tag-editor-constants'


let appIsLaunching = true

const combinedReducers = combineReducers({
	originalTags,
	manualTagEdits,
	parentDirectories,
	isRunningTutorial,
	tutorialText,
	isShowingTutorialText,
})

function rootReducer(state={}, action) {
	if (action.type === TutorialActions.END_TUTORIAL) {
		return action.state
	}

	let s = combinedReducers(state, action)

	s.appIsLaunching = appIsLaunching
	appIsLaunching = false

	let firstSongFilepath = s.originalTags.present.length && s.originalTags.present[0].filepath
	s.patterns = patterns(state.patterns, action, s.parentDirectories, firstSongFilepath)

	s.canUndo = s.originalTags.past.length > 0
	s.canRedo = s.originalTags.future.length > 0
    s.hasMappedPatterns = hasMappedPatterns(s.patterns)
	s.hasManualEdits = _.size(s.manualTagEdits) > 0

	s.tagsBeingViewed = tagsBeingViewed(state.tagsBeingViewed, action, s.hasMappedPatterns, s.hasManualEdits)

	s.isViewingOriginalTags = s.tagsBeingViewed === TagVersion.ORIGINAL
    s.isViewingPatternTags = s.tagsBeingViewed === TagVersion.PATTERN
    s.isViewingEditedTags = s.tagsBeingViewed === TagVersion.EDITED

    s.currentSongs = getSongsBeingViewed(s)
	s.rootClass = buildRootClass(s)

	return s
}

const store = createStore(
	rootReducer,
	applyMiddleware(ioMiddleware)
)

// STATE PERSISTENCE
// ---------------------------------------------
let previousDirectories

store.subscribe(function() {
	let state = store.getState(),
	    currentDirectories = state.parentDirectories

	if (currentDirectories !== previousDirectories && !state.isRunningTutorial) {
		localStorage.setItem('parentDirectories', currentDirectories)
	}
})

export default store