import undoable, {excludeAction, ActionCreators} from 'redux-undo'

import {saveTags} from 'js/io/io'
import store from 'js/redux/store'


export const IoActions = {
	REPLACE_SONGS: 'REPLACE_SONGS',
	SAVE_TAGS: 'SAVE_TAGS',
	UNDO_TAG_SAVE: '@@redux-undo/UNDO',
	REDO_TAG_SAVE: '@@redux-undo/REDO',
}


export const IoActionCreators = {
	replaceSongs: songs => ({
		type: IoActions.REPLACE_SONGS,
		songs,
	}),

	// ioMiddleware adds `songs` property to this action
	saveTags: () => ({
		type: IoActions.SAVE_TAGS
	}),
}


export const originalTags = undoable(
	(state=[], action)  => {
		switch (action.type) {
			case IoActions.REPLACE_SONGS:
			case IoActions.SAVE_TAGS:
				return action.songs
		}
		return state
	},
	{filter: excludeAction(IoActions.REPLACE_SONGS)}
)


export const ioMiddleware = ({ getState }) => next => action => {
	let state = getState()

	switch (action.type) {

		// WRITE TAGS
		case IoActions.SAVE_TAGS:
			saveTagsAndUpdateAction(action, state.currentSongs, state)
			break;

		case IoActions.UNDO_TAG_SAVE:
			saveTagsAndUpdateAction(action, _.last(state.originalTags.past), state)
			break;

		case IoActions.REDO_TAG_SAVE:
			saveTagsAndUpdateAction(action, state.originalTags.future[0], state)
			break;

		// CLEAR UNDO HISTORY
		case IoActions.REPLACE_SONGS:
			store.dispatch(ActionCreators.clearHistory())
			break;
	}

	return next(action)
}

function saveTagsAndUpdateAction(action, songs, state) {
	action.songs = songs
	if (!state.isRunningTutorial) saveTags(action.songs)
}