import React from 'react'

import './PromptCard.css'

const PromptCard = ({ title, image, details, handleClick}) => {
  return (
    <div className="prompt__card"onClick={handleClick}>
      <h4 className='prompt__card__title'>{title}</h4>
      <img src={image} alt={title} className='prompt__card__image'/>
      <p className='prompt__card__text'>{details}</p>
    </div>
  )
}

export default PromptCard