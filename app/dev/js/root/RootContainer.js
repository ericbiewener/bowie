import {connect} from 'react-redux'

import {openTutorial} from 'js/tutorial/playback-controls'
import Root from 'js/root/Root'


const mapStateToProps = state => ({
	rootClass: state.rootClass,
	openTutorial: e => openTutorial()
})

export default connect(
	mapStateToProps
)(Root)