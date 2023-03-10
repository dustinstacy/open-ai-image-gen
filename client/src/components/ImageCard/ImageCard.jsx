import React from 'react'
import { BsDownload } from 'react-icons/bs'
import { GrNewWindow } from 'react-icons/gr'
import { AiFillExperiment } from 'react-icons/ai'

import { downloadImage, openInNewWindow } from '../../utils'

import './ImageCard.scss'

const ImageCard = ({ image, prompt, id, name, handleVariants }) => {
	return (
		<div className='frame'>
			<div className='card'>
				<img src={image} alt={prompt} />
				<div className='inner'>
					<div className='inner__top'>
						<GrNewWindow
							className='window'
							onClick={() => openInNewWindow(image)}
						/>
					</div>
					<div className='inner__middle'>
						<BsDownload
							className='option'
							onClick={() => downloadImage(image, id)}
						/>
						<AiFillExperiment className='option' onClick={handleVariants} />
					</div>
					<div className='inner__bottom'>
						<div className='icon'>{name[0]}</div>
						<p>{name}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ImageCard
