import {openTutorial} from 'js/tutorial/playback-controls'


export default function maybeShowTutorial() {
	if (localStorage.getItem('suppressTutorial')) return
	localStorage.setItem('suppressTutorial', true)
	openTutorial(true)
}