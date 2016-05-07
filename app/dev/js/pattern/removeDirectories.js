function removeDirectories(filepath, quantityAllowed) {
	let filepathParts = filepath.split('/'),
	    quantityToRemove = Math.max(filepathParts.length - 1 - quantityAllowed, 0),
	    remainingParts = filepathParts.slice(quantityToRemove)

	return remainingParts.join('/')
}

export default removeDirectories