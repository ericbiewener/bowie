import React from 'react'
import RestrictedInput from 'react-restricted-input'

export const PositiveIntegerInput = (props) => (
	<RestrictedInput illegal={/\D/g} {...props} />
)