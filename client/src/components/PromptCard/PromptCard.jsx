import React from 'react'

import './PromptCard.scss'

const PromptCard = ({ title, image, handleClick, id }) => {
	return (
		<div className='prompt__card' onClick={handleClick} id={id}>
			<h4>{title}</h4>
			{/* <img src={image} alt={title}/> */}
		</div>
	)
}

export default PromptCard
