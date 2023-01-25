import React from 'react'
import {BiCopyright} from 'react-icons/bi'

import { openAI } from '../../assets'

import "./Footer.scss"

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer__image'>
        <img src={openAI} alt="open-ai" />
      </div>
      <div className='footer__info'>
        <p><BiCopyright/> 2023 Dustin Stacy</p>
      </div>
    </div>
  )
}

export default Footer