import {IoActions} from 'js/io/io-redux'

export function appIsLaunching(state=true, action) {
	if (action.type === IoActions.REPLACE_SONGS) return false
	return state
}