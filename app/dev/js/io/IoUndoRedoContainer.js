import {connect} from 'react-redux'

import {ActionCreators} from 'redux-undo'
import UndoRedoButtons from 'js/components/UndoRedoButtons'


const mapStateToProps = state => ({
	canUndo: state.canUndo,
	canRedo: state.canRedo,
})

const mapDispatchToProps = {
	undo: () => ActionCreators.undo(),
	redo: () => ActionCreators.redo(),
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UndoRedoButtons)