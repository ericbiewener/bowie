import {connect} from 'react-redux'

import {IoActionCreators} from 'js/io/io-redux'
import Button from 'js/components/Button'


const mapStateToProps = state => ({
	text: 'Save Changes',
	className: 'primary',
})

const mapDispatchToProps = {
	onClick: (e, songs) => IoActionCreators.saveTags(songs)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Button)