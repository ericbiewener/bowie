import React from 'react'

import {slugify} from 'js/utils'
import {PositiveIntegerInput} from 'js/components/RestrictedCharacterInput'


const EditableDataTable = (props) => {

	let {data, originalData, fields, viewEditedTags, onInputChange, onBlur, integerFields} = props

	return 	<table className='data-table'>
				<thead><tr>
					{fields.map((field, i) => (
						<th className={slugify(field)} key={i}>{field}</th>
					))}
				</tr></thead>
				<tbody>
					{data.map((datum, i) => (
						<tr key={i}>
							{fields.map((field, n) => (
								<Cell
									key={n}
									field={field}
									value={datum[field]}
									originalValue={originalData[i][field]}
									onChange={onInputChange.bind(null, i)}
									onFocus={viewEditedTags}
									onBlur={onBlur}
									integerFields={integerFields}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
}

const Cell = function({field, value, originalValue, onChange, onBlur, onFocus, integerFields}) {
	let isEdited = value !== originalValue,
	    className = isEdited ? 'edited' : null,
	    inputValue = value || ''

	let input = integerFields.indexOf(field) > -1
					? <PositiveIntegerInput
						onChange={(e, newVal) => onChange(field, newVal, originalValue)}
						value={inputValue}
						className={className}
						onFocus={onFocus}
						onBlur={onBlur} />
					: <input
						onChange={e => onChange(field, e.target.value, originalValue)} 
						value={inputValue}
						className={className}
						onFocus={onFocus}
						onBlur={onBlur} />

	return	<td className={slugify(field)}>
			   {input}
			   <div className='full-text'>{inputValue}</div>
			</td>
}

export default EditableDataTable