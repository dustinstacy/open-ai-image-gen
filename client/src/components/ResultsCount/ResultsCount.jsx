import React from 'react'

import './ResultsCount.scss'

const ResultsCount = ({ handleChange }) => {
	return (
		<div className='results__count'>
			<label>
				# of results:
				<input
					className='count'
					type='number'
					step='1'
					min='1'
					max='4'
					defaultValue='1'
					onChange={(e) => handleChange('count', e)}
				/>
			</label>
		</div>
	)
}

export default ResultsCount
