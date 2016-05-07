import removeDirectories from 'js/pattern/removeDirectories'
import {insertPattern, deletePattern, preservePatternsForNewText} from 'js/pattern/pattern-manipulators'
import {IoActions} from 'js/io/io-redux'


export const PatternActions = {
	ADD_UNMAPPED_PATTERN: 'ADD_UNMAPPED_PATTERN',
	MAP_PATTERN: 'MAP_PATTERN',
	REMOVE_PATTERN: 'REMOVE_PATTERN',
	CHANGE_NUMBER_OF_DIRECTORIES: 'CHANGE_NUMBER_OF_DIRECTORIES',
}


export const PatternActionCreators = {
	createUnmappedPattern: (patternIndex, textStart, textEnd) => ({
		type: PatternActions.ADD_UNMAPPED_PATTERN,
		patternIndex,
		textStart,
		textEnd,
	}),

	mapPattern: (mapping, patternIndex) => ({
		type: PatternActions.MAP_PATTERN,
		patternIndex,
		mapping,
	}),

	deletePattern: patternIndex => ({
		type: PatternActions.REMOVE_PATTERN,
		patternIndex,
	}),

	changeNumberOfDirectories: change => ({
		type: PatternActions.CHANGE_NUMBER_OF_DIRECTORIES,
		change
	}),
}


export function patterns(state=[], action, parentDirectories, filepath) {
	switch (action.type) {
		case IoActions.REPLACE_SONGS:
		case IoActions.SAVE_TAGS:
			return [{ text: removeDirectories(action.songs[0].filepath, parentDirectories) }]

		case PatternActions.CHANGE_NUMBER_OF_DIRECTORIES:
			let remainingPath = removeDirectories(filepath, parentDirectories)
			return preservePatternsForNewText(state, remainingPath)

		case PatternActions.ADD_UNMAPPED_PATTERN:
			return insertPattern(state, action.patternIndex, action.textStart, action.textEnd)

		case PatternActions.MAP_PATTERN:
			let startPatterns = state.slice(0, action.patternIndex),
			    endPatterns = state.slice(action.patternIndex + 1),
			    newPattern = {...state[action.patternIndex]}

			newPattern.mapping = action.mapping
			return [...startPatterns, newPattern, ...endPatterns]

		case PatternActions.REMOVE_PATTERN:
			return deletePattern(state, action.patternIndex)
	}

	return state
}

const rehydratedParentDirectories = Number(localStorage.getItem('parentDirectories') || 2)

export function parentDirectories(state=rehydratedParentDirectories, action) {
	if (action.type === PatternActions.CHANGE_NUMBER_OF_DIRECTORIES) {
		return Math.max(action.change, 0)
	}
	return state
}