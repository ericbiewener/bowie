import store from 'js/store/store'


const actions = []

export const recordActionsMiddleware = ({ getState }) => next => action => {
	actions.push(action)
	console.log('ALL ACTIONS', actions)
	return next(action)
}