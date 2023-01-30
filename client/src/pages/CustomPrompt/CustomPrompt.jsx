import { useEffect, useState } from 'react'
import axios from 'axios'

import {
	Loader,
	SizeSlider,
	ResultsCount,
	ImageCard,
	Footer,
} from '../../components'
import { fetchResults, integerConversion, sizeConversion } from '../../utils'
import { useGlobalContext } from '../../context/GlobalContext'

import './CustomPrompt.scss'

const CustomPrompt = () => {
	const { user } = useGlobalContext()

	const [inputs, setInputs] = useState({
		prompt: '',
		count: '1',
		size: '1',
	})
	const [isLoading, setIsLoading] = useState(false)
	const [imageData, setImageData] = useState(null)
	const [imageRetrieved, setImageRetrieved] = useState(false)

	const handleFormFieldChange = (fieldName, e) => {
		setInputs({ ...inputs, [fieldName]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setImageData(false)
		setImageRetrieved(false)
		setIsLoading(true)
		integerConversion({ inputs })
		sizeConversion({ inputs })
		fetchResults({ inputs, setImageData, setImageRetrieved, setIsLoading })
	}

	useEffect(() => {
		if (user && imageRetrieved) {
			setImageRetrieved(false)
			axios.post('/api/history/new', {
				user: user._id,
				name: user.name,
				prompt: inputs.prompt,
				images: imageData,
			})
		}
	}, [imageRetrieved, user, inputs, imageData])

	return (
		<div className='custom__container'>
			<div className='custom'>
				<div className='image__container'>
					{isLoading && <Loader />}
					{imageData && (
						<div className='history__collection'>
							<div className='history__images'>
								{imageData.map((image, i) => (
									<ImageCard
										id={image.slice(-10)}
										prompt={inputs.prompt}
										name={user.name}
										image={image}
										key={image}
									/>
								))}
							</div>
							<div className='history__prompt'>
								<p>{inputs.prompt}</p>
							</div>
						</div>
					)}
				</div>
				<form className='form' onSubmit={handleSubmit}>
					<div className='form__prompt'>
						<label>Enter your prompt:</label>
						<input
							type='text'
							placeholder='What will you discover?'
							onChange={(e) => handleFormFieldChange('prompt', e)}
						/>
					</div>
					<div className='form__inputs'>
						<ResultsCount handleChange={handleFormFieldChange} />
						<SizeSlider handleChange={handleFormFieldChange} />
						<button type='submit'>Generate</button>
					</div>
				</form>
				<Footer />
			</div>
		</div>
	)
}

export default CustomPrompt
