import {connect} from 'react-redux'

import {FIELDS, INTEGER_FIELDS} from 'js/tag-editor/tag-editor-constants'
import {TagEditorActionCreators} from 'js/tag-editor/tag-editor-redux'
import EditableDataTable from 'js/components/EditableDataTable'


function mapStateToProps(state) {
	return {
		data: state.currentSongs,
		originalData: state.originalTags.present,
		fields: FIELDS,
		integerFields: INTEGER_FIELDS
	}
}

let {updateTag, viewEditedTags, inputBlurred} = TagEditorActionCreators

const mapDispatchToProps = {
	onInputChange: updateTag,
	viewEditedTags: viewEditedTags,
	onBlur: inputBlurred,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditableDataTable)