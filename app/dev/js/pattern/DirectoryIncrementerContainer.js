import {connect} from 'react-redux'

import {FIELDS} from 'js/tag-editor/tag-editor-constants'
import {PatternActionCreators} from 'js/pattern/pattern-redux'
import NumberIncrementer from 'js/components/NumberIncrementer'


const mapStateToProps = state => ({
	number: state.parentDirectories
})

const mapDispatchToProps = {
	onClick: number => PatternActionCreators.changeNumberOfDirectories(number)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NumberIncrementer)