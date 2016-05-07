import {connect} from 'react-redux'

import {FIELDS} from 'js/tag-editor/tag-editor-constants'
import {PatternActionCreators} from 'js/pattern/pattern-redux'
import PatternBuilder from 'js/pattern/PatternBuilder'


let {createUnmappedPattern, mapPattern, deletePattern} = PatternActionCreators

function mapStateToProps(state) {
	let usedFields = state.patterns.map(s => s.mapping)
	let availableFields = FIELDS.filter(f => usedFields.indexOf(f) === -1)

	return {
		patterns: state.patterns,
		options: availableFields,
	}
}

const mapDispatchToProps = {
	onTextSelected: (patternIndex, textStart, textEnd) => createUnmappedPattern(patternIndex, textStart, textEnd),
	onSelectorItemClicked: (itemIndex, mapping) => mapPattern(itemIndex, mapping),
	onMapLabelClicked: patternIndex => deletePattern(patternIndex),
	dismissMapSelector: patternIndex => deletePattern(patternIndex)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PatternBuilder)