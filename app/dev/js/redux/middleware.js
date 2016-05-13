import store from 'js/redux/store'


const actions = []

export const recordActionsMiddleware = ({ getState }) => next => action => {
	actions.push(action)
	console.log('ALL ACTIONS', actions)
	return next(action)
}