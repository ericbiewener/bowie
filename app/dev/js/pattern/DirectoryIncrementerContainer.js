import {connect} from 'react-redux'

import {FIELDS} from 'js/tag-editor/tag-editor-constants'
import {PatternActionCreators} from 'js/pattern/pattern-redux'
import DirectoryIncrementer from 'js/pattern/DirectoryIncrementer'


const mapStateToProps = state => ({
	number: state.parentDirectories
})

const mapDispatchToProps = {
	onClick: number => PatternActionCreators.changeNumberOfDirectories(number)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DirectoryIncrementer)