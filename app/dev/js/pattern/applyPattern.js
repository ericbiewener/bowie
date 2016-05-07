import _ from 'js/lodash-modules'
import {occurrencesInString, isNumeric} from 'js/utils'
import removeDirectories from 'js/pattern/removeDirectories'


/**
 * The pattern matching algorithm works by maintaining a `remainingPath` key
 * on each song that gets trimmed down as new substrings in the path are matched.
 * The primary steps are:
 *
 *    1. Trim off parent directories
 *    2. Consolidate consecutive, unmapped patterns into single, longer ones
 *    3. Loop over patterns
 *        - discard unmapped patterns
 *        - attempt to match first by using the next pattern as a delimiter
 *        - if that fails, match simply on the curren pattern's text length
 */

function applyPattern(songsInput, patternsInput, parentDirectories) {
	let songs = _.cloneDeep(songsInput),
	    patterns = _.cloneDeep(patternsInput)

	// Trim off parent directories
	songs.forEach(song => {
		song.remainingPath = removeDirectories(song.filepath, parentDirectories)
	})

	// When the user selects text but has yet to map it, there will potentially be
	// consecutive, unmapped patterns. We consolidate these back down into a single
	// longer pattern. This improves the accuracy of `discardUnmappedPattern()`
	let consolidatedPatterns = [patterns[0]],
	    prevPatternIsUnmapped = !patterns[0].mapping
	
	for (var i = 1; i < patterns.length; i++) {
		let pattern = patterns[i],
		    currentPatternIsUnmapped = !pattern.mapping

		if (prevPatternIsUnmapped && currentPatternIsUnmapped) {
			_.last(consolidatedPatterns).text += pattern.text
		} else {
			consolidatedPatterns.push(pattern)
		}

		prevPatternIsUnmapped = currentPatternIsUnmapped
	}

	// Begin pattern matching

	for (let i = 0; i < consolidatedPatterns.length; i++) {
		let pattern = consolidatedPatterns[i],
			nextPattern = consolidatedPatterns[i+1],
			field = pattern.mapping,
			patternLength = pattern.text.length

		if (!field) {
			discardUnmappedPattern(songs, pattern)
			continue
		}

		// Mapped pattern is not the very end of the filepath string
		if (nextPattern) {
			let delimiter = nextPattern.text,
				delimiterOccurrences = occurrencesInString(pattern.text, delimiter.text)

			// First try matching on delimiter. Fall back to mattching on pattern length if that fails.
			songs.forEach(song => {
				let result = matchOnDelimiter(song, field, pattern, delimiter, delimiterOccurrences)
				if (!result) matchOnTextLength(song, field, patternLength)
			})
		} 
		else {
			// Extreme edge case. The user selected the filepath all the way to the end.
			// So they either selected the file extension, or the file has no extension.
			consumeRemainingFilepath(songs, field)
			
		}
	}

	return songs
}

function discardUnmappedPattern(songs, pattern) {
	let patternText = pattern.text,
		lastChar = patternText.slice(-1),
		charOccurrences = occurrencesInString(patternText, lastChar)

	songs.forEach(song => {
		song.remainingPath = song.remainingPath.split(lastChar).slice(charOccurrences).join(lastChar)
	})
}

function matchOnDelimiter(song, field, pattern, delimiter, delimiterOccurrences) {
	let delimiterLocation = song.remainingPath.indexOf(delimiter, delimiterOccurrences)
	// console.debug(song, field, delimiter, delimiterOccurrences)
	if (delimiterLocation === -1) return false

	let tagValue = song.remainingPath.slice(0, delimiterLocation),
		validatedTagValue = validateTagValue(field, tagValue)

	setValueAndTrimRemainingPath(song, field, validatedTagValue, pattern.text.length)

	return true
}

function matchOnTextLength(song, field, patternLength) {
	let validatedTagValue = validateTagValue(field, song.remainingPath.slice(0, patternLength))
	setValueAndTrimRemainingPath(song, field, validatedTagValue, patternLength)
}

function setValueAndTrimRemainingPath(song, field, validatedTagValue, patternLength) {
	if (validatedTagValue !== false) song[field] = validatedTagValue
	song.remainingPath = song.remainingPath.slice(patternLength)
}

function consumeRemainingFilepath(songs, field) {
	songs.forEach(song => {
		let validatedTagValue = validateTagValue(field, song.remainingPath)

		if (validatedTagValue !== false) {
			song[field] = validatedTagValue
		}
	})
}

function validateTagValue(field, value) {
	if (field !== 'Year' && field !== 'Track' && field !== 'Disc') {
		return value !== '' ? value : false
	}

	// Being extremely cautious to make sure we're getting a valid integer value.
	let intValue = parseInt(value, 10)
	return isNumeric(value) && intValue === parseFloat(value, 10) && intValue > 0
				? intValue
				: false
}

export default applyPattern