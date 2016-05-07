export function deletePattern(patterns, i) {
	let pattern = patterns[i],
	    prevIndex = i - 1,
	    nextIndex = i + 1,
	    prevPattern = patterns[prevIndex],
	    nextPattern = patterns[nextIndex],
	    newPattern

	if (prevPattern && !prevPattern.selected) {
		newPattern = {selected: false, text: prevPattern.text + pattern.text}
		prevIndex--
	} else {
		newPattern = pattern
		newPattern.selected = false
		delete newPattern.mapping
	}

	if (nextPattern && !nextPattern.selected) {
		newPattern.text += nextPattern.text
		nextIndex++
	}

	let updatedPatterns
	if (prevIndex >= 0) {
		updatedPatterns = [
			...patterns.slice(0, prevIndex),
			patterns[prevIndex],
			newPattern
		]
	} else {
		updatedPatterns = [newPattern]
	}

	return [...updatedPatterns, ...patterns.slice(nextIndex)]
}

export function insertPattern(patterns, patternIndex, textStart, textEnd) {
	// The pattern at patternIndex gets discarded, while its text gets divided
	// into 1-3 new patterns, depending on the start & end locations 
	let startPatterns = patterns.slice(0, patternIndex),
	    endPatterns = patterns.slice(patternIndex + 1),
	    newPatterns = [],
	    text = patterns[patternIndex].text

	if (textStart > 0) {
		newPatterns.push({selected: false, text: text.slice(0, textStart)})
	}

	newPatterns.push({
		selected: true,
		text: text.slice(textStart, textEnd),
	})

	if (textEnd < text.length) {
		newPatterns.push({selected: false, text: text.slice(textEnd)})
	}

	return [...startPatterns, ...newPatterns, ...endPatterns]
}

export function preservePatternsForNewText(patterns, newText) {
	let newPatterns = []
	// Walk backwards through the patterns and the path string,
	// slicing off the matched parts of `newText`
	for (let i = patterns.length - 1; i >= 0; i--) {
		let pattern = patterns[i],
		    strPos = newText.lastIndexOf(pattern.text)

		if (strPos === -1) break
		
		let newPattern = {...pattern}
		newPattern.text = newText.slice(strPos)
		newPatterns.push(newPattern)
		newText = newText.slice(0, strPos)
	}

	newPatterns.reverse()
	
	if (newText) {
		// If first pattern is unmapped, prepend whatever path is left.
		// Otherwise, add remaining path as an empty pattern
		let firstPattern = newPatterns[0]
		if (firstPattern && !firstPattern.selected) {
			firstPattern.text = newText + firstPattern.text
		} else {
			newPatterns.unshift({text: newText})
		}
	}

	return newPatterns
}