import React from 'react'

import { openAI } from '../../assets'

import './Footer.scss'

const Footer = () => {
	return (
		<div className='footer'>
			<div className='footer__image'>
				<span>POWERED BY</span>
				<img src={openAI} alt='open-ai' />
			</div>
			<div className='footer__info'>
				<p>2023 Dustin Stacy</p>
			</div>
		</div>
	)
}

export default Footer
