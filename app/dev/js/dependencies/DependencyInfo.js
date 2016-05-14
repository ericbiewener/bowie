import React from 'react'


const MESSAGES = [
	"Still no dice! You sure you're connected?",
	"Perhaps you're downloading too much... you know...",
	"Well, one of us is wrong.",
	"Nope."
]

let messageIndex = 0,
    maxMessageIndex = MESSAGES.length - 1

const TRY_AGAIN_TEXT = 'Try again ›'


const DependencyInfo = React.createClass({
	getNoInternetText: function() {
		let text = MESSAGES[messageIndex]
		if (messageIndex < maxMessageIndex) messageIndex++
		return text
	},

	onClick: function() {
		this.tryAgainEl.textContent = 'Checking...'

		// Need setTimeout to make it clear to the user that we are actually
		// doing something. The ping failure occurs too quickly.
		setTimeout(() => {
			this.props.onClick()
			this.noInternetEl.textContent = this.getNoInternetText()
			this.tryAgainEl.textContent = TRY_AGAIN_TEXT
		}, 1000)
	},

	render: function() {
		return 	<div id='dependencies'>
					<div className='installing-dependencies'>
						<div className='logo'></div>
						<div className='text'>Installing Dependencies. This will take a few minutes...</div>
						<div className='dependency-message'>{this.props.dependencyBeingInstalled}<span className='ellipsis'></span></div>
					</div>
					<div className='no-internet'>
						<div className='text' ref={el => this.noInternetEl = el}>It appears that you aren't connected to the internet. The first time using this app, we need to download and install some dependencies. Please check your internet connection.</div>
						<a onClick={this.onClick} ref={el => this.tryAgainEl = el}>{TRY_AGAIN_TEXT}</a>
					</div>
				</div>
	}
})

export default DependencyInfo