import applyPattern from 'js/pattern/applyPattern'


// Determines the song tag versions to show
export function getSongsBeingViewed(state) {
	let songs = state.originalTags.present

	if (state.isViewingPatternTags && state.hasMappedPatterns) {
		songs = applyPattern(songs, state.patterns, state.parentDirectories)
	}
	else if (!state.isViewingOriginalTags && state.hasManualEdits) {
		songs = _.cloneDeep(songs)
		_.each(state.manualTagEdits, v => songs[v.songIndex][v.field] = v.newVal)
	}

	return songs
}

export function hasMappedPatterns(patterns) {
	for (let i = patterns.length - 1; i >= 0; i--) {
		if (patterns[i].mapping) {
			return true
		}
	}
	return false
}

const booleanStateForRootClass = [
	'appIsLaunching', 'canUndo', 'canRedo', 'hasManualEdits', 'hasMappedPatterns',
	'isViewingOriginalTags', 'isViewingPatternTags', 'isViewingEditedTags', 'isRunningTutorial', 
	'isShowingTutorialText',
]

export function buildRootClass(state) {
	let rootClass = state.dependencyStatus + ' '
	console.debug(state.dependencyStatus)
	booleanStateForRootClass.forEach(p => rootClass += state[p] ? p + ' ' : '')
	return rootClass
}