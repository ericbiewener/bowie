import _ from 'js/lodash-modules'
import {IoActions} from 'js/io/io-redux'
import {PatternActions} from 'js/pattern/pattern-redux'
import {TagVersion} from 'js/tag-editor/tag-editor-constants'


export const TagEditorActions = {
	UPDATE_TAG: 'UPDATE_TAG',
	INPUT_BLURRED: 'INPUT_BLURRED',
	VIEW_ORIGINAL_TAGS: 'VIEW_ORIGINAL_TAGS',
	VIEW_PATTERN_TAGS: 'VIEW_PATTERN_TAGS',
	VIEW_EDITED_TAGS: 'VIEW_EDITED_TAGS',
}

export const TagEditorActionCreators = {
	updateTag: (songIndex, field, newVal, originalVal) => ({
		type: TagEditorActions.UPDATE_TAG,
		songIndex,
		field,
		newVal,
		originalVal
	}),

	inputBlurred: () => ({
		type: TagEditorActions.INPUT_BLURRED
	}),

	viewOriginalTags: () => ({
		type: TagEditorActions.VIEW_ORIGINAL_TAGS,
	}),

	viewPatternTags: () => ({
		type: TagEditorActions.VIEW_PATTERN_TAGS,
	}),

	viewEditedTags: () => ({
		type: TagEditorActions.VIEW_EDITED_TAGS
	}),
}

export function manualTagEdits(state={}, action) {
	switch (action.type) {
		case TagEditorActions.UPDATE_TAG:
			let newState = _.cloneDeep(state)
			let key = action.songIndex + action.field
			if (action.newVal !== action.originalVal) {
				newState[key] = action
			} else {
				delete newState[key]
			}
			return newState

		case IoActions.REPLACE_SONGS:
		case IoActions.SAVE_TAGS:
			return {}
	}
	return state
}

export function tagsBeingViewed(state=TagVersion.ORIGINAL, action, hasMappedPatterns, hasManualEdits) {
	switch (action.type) {
		case TagEditorActions.VIEW_ORIGINAL_TAGS:
		case IoActions.REPLACE_SONGS:
		case IoActions.SAVE_TAGS:
			return TagVersion.ORIGINAL

		case TagEditorActions.VIEW_PATTERN_TAGS:
		case PatternActions.CREATE_UNMAPPED_PATTERN:
			return TagVersion.PATTERN

		case TagEditorActions.VIEW_EDITED_TAGS:
			return TagVersion.EDITED

		case PatternActions.DELETE_PATTERN:
			return hasMappedPatterns ? TagVersion.PATTERN : TagVersion.ORIGINAL
		
		case TagEditorActions.INPUT_BLURRED:
			return hasManualEdits ? TagVersion.EDITED : TagVersion.ORIGINAL
	}
	return state
}