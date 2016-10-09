import React from 'react'

import {listenFor} from 'react-global-events'
import {readFiles} from 'js/io/io'
import Dropzone from 'react-dropzone'
import IoSaveTagsButton from 'js/io/IoSaveTagsContainer'
import IoUndoRedoButtons from 'js/io/IoUndoRedoContainer'
import PatternBuilder from 'js/pattern/PatternBuilderContainer'
import DirectoryIncrementer from 'js/pattern/DirectoryIncrementerContainer'
import TagEditor from 'js/tag-editor/TagEditorContainer'
import TagVersionSwitcher from 'js/tag-editor/TagVersionSwitcherContainer'
import Tutorial from 'js/tutorial/TutorialContainer'
import DependencyInfo from 'js/dependencies/DependencyInfoContainer'


const Root = ({rootClass, openTutorial}) => (
	<div id="app-root" className={rootClass}>
		<Dropzone 
			onDrop={readFiles}
			disableClick={true}
			className='dropzone'
			activeClassName='active'
			{...listenFor('mouseUp', 'mouseDown')}
		>
			<div id='main-content'>
				<div id='top-bar'>
					<div className='left'>
						<IoUndoRedoButtons />
						<a onClick={openTutorial} className='run-tutorial'>Show Tutorial</a>
					</div>
					<DirectoryIncrementer number={2} min={0} />
				</div>
				<PatternBuilder />
				<div className='tag-version-switcher'>
					<TagVersionSwitcher />
					<IoSaveTagsButton />
				</div>
				<TagEditor />
			</div>
			<div className='dropzone-message'>
				<h1>FEED ME!</h1>
				<div>(Drop MP3, MP4, or M4A files here)</div>
			</div>
		</Dropzone>
		<Tutorial />
		<DependencyInfo />
		<div className='logo main'></div>
	</div>
)

export default Root