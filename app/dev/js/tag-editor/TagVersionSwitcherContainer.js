import {connect} from 'react-redux'

import {TagEditorActionCreators} from 'js/tag-editor/tag-editor-redux'
import SimpleMenu from 'js/components/SimpleMenu'


let {viewOriginalTags, viewPatternTags, viewEditedTags} = TagEditorActionCreators

const mapStateToProps = state => ({
	listItems: [
		{text: 'Current', isActive: state.isViewingOriginalTags},
		{text: 'Pattern', isActive: state.isViewingPatternTags},
		{text: 'Manual Edits', isActive: state.isViewingEditedTags},
	]
})

const mapDispatchToProps = dispatch => ({
	onClicks: [
		() => dispatch(viewOriginalTags()),
		() => dispatch(viewPatternTags()),
		() => dispatch(viewEditedTags()),
	]
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SimpleMenu)