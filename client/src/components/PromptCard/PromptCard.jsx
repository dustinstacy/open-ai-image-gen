import React from 'react'

import './PromptCard.css'

const PromptCard = ({ title, image, handleClick, id}) => {
  return (
    <div className="prompt__card"onClick={handleClick} id={id}>
      <h4 className='prompt__card__title'>{title}</h4>
      <img src={image} alt={title} className='prompt__card__image'/>
    </div>
  )
}

export default PromptCard