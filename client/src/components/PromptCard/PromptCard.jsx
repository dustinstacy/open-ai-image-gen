import React from 'react'

import './PromptCard.css'

const PromptCard = ({ title, image, details, handleClick}) => {
  return (
    <div onClick={handleClick}>
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <p>{details}</p>
    </div>
  )
}

export default PromptCard