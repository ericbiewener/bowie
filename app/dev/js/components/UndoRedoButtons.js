import React from 'react'


const UndoRedoButtons = ({canUndo, canRedo, undo, redo}) => (
	<div className='undo-redo'>
		<button onClick={undo} className={'undo' + (canUndo ? '' : ' disabled')}>
			<i className='fa fa-undo'></i>
			Undo
		</button>
		<button onClick={redo} className={'redo' + (canRedo ? '' : ' disabled')}>
			Redo
			<i className='fa fa-undo'></i>
		</button>
	</div>
)

export default UndoRedoButtons