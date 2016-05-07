import {connect} from 'react-redux'

import {playNextSequence, closeTutorial} from 'js/tutorial/playback-controls'
import Tutorial from 'js/tutorial/Tutorial'


const mapStateToProps = (state) => ({
	text: state.tutorialText,
	next: playNextSequence,
	end: closeTutorial,
})

export default connect(
	mapStateToProps
)(Tutorial)