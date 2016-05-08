import {connect} from 'react-redux'

import {checkDependencies} from 'js/dependencies/check-dependencies'
import {DependencyActions} from 'js/dependencies/dependencies-redux'
import DependencyInfo from 'js/dependencies/DependencyInfo'


const mapStateToProps = state => ({
	onClick: checkDependencies
})

export default connect(
	mapStateToProps
)(DependencyInfo)