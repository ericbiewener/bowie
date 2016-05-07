import _ from 'js/lodash-modules'

export function occurrencesInString(str, substr) {
	return str.split(substr).length - 1
}

export function slugify(str) {
	return str.replace(/ /g, '-').toLowerCase()
}

export function isNumeric(obj) {
	// From jQuery
	return !_.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0
}