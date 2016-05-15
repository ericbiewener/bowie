export default function subscribe(store) {
	let previousDirectories

	store.subscribe(function() {
		let state = store.getState(),
		    currentDirectories = state.parentDirectories

		if (currentDirectories !== previousDirectories && !state.isRunningTutorial) {
			localStorage.setItem('parentDirectories', currentDirectories)
		}
	})
}