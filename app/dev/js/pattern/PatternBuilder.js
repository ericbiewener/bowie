import React from 'react'

import {slugify} from 'js/utils'
import GlobalEvents from 'react-global-events'
import FontResizer from 'react-font-resizer'


const PatternBuilder = React.createClass({

	componentDidMount: function() {
		GlobalEvents.subscribe(this, 'mouseDown', 'mouseUp')
	},

	componentWillUnmount: function() {
		GlobalEvents.unsubscribe(this, 'mouseDown', 'mouseUp')
	},

	onGlobalMouseDown: function() {
		// Dismisses the map selector and removes the corresponding unmapped pattern
		for (let i = 0; i < this.props.patterns.length; i++) {
			let pattern = this.props.patterns[i]
			if (pattern.selected && !pattern.mapping) {
				this.props.dismissMapSelector(i)
				break
			}
		}
	},

	onGlobalMouseUp: function(e) {
		// Identifies which text of which pattern has been selected

		let sel = window.getSelection()
		if (sel.isCollapsed) return

		let node, start, end

		// If selection ends on a selected pattern, moving right
		if (sel.focusNode.nodeName === 'DIV') {
			node = sel.anchorNode
			start = sel.anchorOffset
			end = sel.anchorNode.nodeValue.length
		}
		// If selection ends on a selected pattern, moving left
		else if (sel.anchorNode.nodeName === 'DIV') {
			node = sel.focusNode
			start = sel.focusOffset
			end = sel.focusNode.nodeValue.length
		}
		else {
			node = sel.anchorNode
			start = Math.min(sel.anchorOffset, sel.focusOffset)
			end = Math.max(sel.anchorOffset, sel.focusOffset)
		}

		let nodeIndex = Array.prototype.indexOf.call(this.el.children, node.parentElement)

		sel.removeAllRanges()
		this.props.onTextSelected(nodeIndex, start, end)
	},

	render: function() {
		let options = this.props.options

		return 	<FontResizer>
					<div className='pattern-builder' ref={el => this.el = el}>
						{this.props.patterns.map((pattern, i) => {
							if (!pattern.selected) {
								return <div key={i} className='unselected'>{pattern.text}</div>
							}

							let Component = pattern.mapping ? MappedPattern : UnmappedPattern
							return <Component pattern={pattern} i={i} {...this.props} key={i} />
						})}
					</div>
				</FontResizer>
	}
})

const UnmappedPattern = ({pattern, i, options, onSelectorItemClicked}) => {
	let li = options.length
				? 	options.map((option, n) => (
						<li key={n}
							onClick={e => onSelectorItemClicked(e.target.textContent, i)}
							onMouseDown={e => e.stopPropagation()}>
							{option}
						</li>
					))
				:	<li onMouseDown={e => e.stopPropagation()}
						className='no-fields'>
						No fields left!
					</li>

	return  <div className={createClassName(pattern)}>
				{pattern.text}
				<ul className='map-selector'>
					{li}
				</ul>
			</div>
}

const MappedPattern = ({pattern, i, options, onMapLabelClicked}) => (
	<div className={createClassName(pattern)}>
		{pattern.text}
		<label className='mapping'
			 onClick={e => onMapLabelClicked(i)}>
			 {pattern.mapping}
		</label>
	</div>
)

const createClassName = pattern => (
	pattern.mapping
		? `selected mapping-${slugify(pattern.mapping)}`
		: 'selected'
)

export default PatternBuilder