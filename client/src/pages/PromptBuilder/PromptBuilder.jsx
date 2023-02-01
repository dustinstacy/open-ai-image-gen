import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { CgCloseR } from 'react-icons/cg'
import axios from 'axios'

import {
	PromptCard,
	ResultsCount,
	SizeSlider,
	Loader,
	ImageCard,
	Footer,
} from '../../components'
import {
	sizeConversion,
	integerConversion,
	fetchResults,
	fetchVariants,
} from '../../utils'
import { useGlobalContext } from '../../context/GlobalContext'

import './PromptBuilder.scss'

const PromptBuilder = () => {
	const { user, prompts } = useGlobalContext()
	const [inputs, setInputs] = useState({
		prompt: '',
		count: '1',
		size: '1',
	})
	const [selectedPrompts, setSelectedPrompts] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [imageRetrieved, setImageRetrieved] = useState(false)
	const [imageData, setImageData] = useState(null)
	const [convertedData, setConvertedData] = useState(null)

	const promptBuild = selectedPrompts.join(' ')
	const categories = [
		'Subject',
		'Action',
		'Object',
		'Mood',
		'Setting',
		'Style',
		'Detail',
	]

	const handleFormFieldChange = (fieldName, e) => {
		setInputs({ ...inputs, [fieldName]: e.target.value })
	}

	const handleClick = (prompt, e) => {
		console.log(prompt)
		const activePrompt = document.getElementById(prompt)
		const value = prompt.prompt

		if (selectedPrompts.includes(prompt)) {
			setSelectedPrompts(
				selectedPrompts.filter((prompts) => prompts !== prompt)
			)
			activePrompt.classList.remove('active__prompt')
		} else if (selectedPrompts.includes(value)) {
			e.target.classList.remove('active__prompt')
			setSelectedPrompts(
				selectedPrompts.filter((prompts) => prompts !== prompt.prompt)
			)
		} else {
			e.target.classList.add('active__prompt')
			setSelectedPrompts([...selectedPrompts, value])
		}

		setInputs({ ...inputs, prompt: promptBuild })
	}

	const addCustomPrompt = () => {
		const customPrompt = document.getElementById('custom__prompt')
		setSelectedPrompts([...selectedPrompts, customPrompt.value])
		customPrompt.value = ''
	}

	const handleEnterKey = (e) => {
		const customPrompt = document.getElementById('custom__prompt')
		if (e.key === 'Enter' && customPrompt.value.length > 0) {
			addCustomPrompt()
		}
	}

	useEffect(() => {
		const currentPrompts = inputs.prompt
		if (currentPrompts !== promptBuild) {
			setInputs({ ...inputs, prompt: promptBuild })
		}
	}, [selectedPrompts, inputs, promptBuild])

	const surpriseMe = (e) => {
		const randomPrompts = []
		categories.forEach((category) => {
			const newArray = []
			prompts.forEach((prompt) => {
				if (prompt.category === category) {
					newArray.push(prompt.prompt)
				}
			})
			const randomPrompt = newArray[Math.floor(Math.random() * newArray.length)]
			randomPrompts.push(randomPrompt)
		})
		console.log(randomPrompts)
		setSelectedPrompts(randomPrompts)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setImageData(null)
		setImageRetrieved(false)
		setConvertedData(null)
		setIsLoading(true)
		integerConversion({ inputs })
		sizeConversion({ inputs })
		fetchResults({ inputs, setImageData, setImageRetrieved, setIsLoading })
	}

	const handleVariants = async (image, e) => {
		console.log('clicked')
		e.preventDefault()
		setImageData(null)
		setImageRetrieved(false)
		setConvertedData(null)
		setIsLoading(true)
		integerConversion({ inputs })
		sizeConversion({ inputs })
		fetchVariants({
			inputs,
			image,
			setImageData,
			setImageRetrieved,
			setIsLoading,
		})
	}

	useEffect(() => {
		if (user && imageRetrieved) {
			setImageRetrieved(false)
			axios
				.post('/api/history/new', {
					user: user._id,
					name: user.name,
					prompt: inputs.prompt,
					images: imageData,
				})
				.then((res) => setConvertedData(res.data))
			setIsLoading(false)
		}
	}, [imageRetrieved, user, inputs, imageData])

	const reset = (e) => {
		e.preventDefault()
		setImageRetrieved(false)
		setImageData(null)
	}

	return (
		<div className='builder__container'>
			{(imageData || isLoading) && (
				<div className='results'>
					{isLoading && <Loader />}
					{convertedData && (
						<div className='results__container'>
							<div className='history__collection'>
								<div className='history__images'>
									{convertedData.images.map((image) => (
										<ImageCard
											id={image.slice(-10)}
											name={user.name}
											prompt={inputs.prompt}
											image={image}
											handleVariants={(e) => handleVariants(image, e)}
											key={image}
										/>
									))}
								</div>
								<div className='history__prompt'>
									<p>{convertedData.prompt}</p>
								</div>
							</div>
							<button onClick={(e) => reset(e)}>Try again?</button>
							<Footer />
						</div>
					)}
				</div>
			)}

			{!imageData && !isLoading && (
				<div className='container'>
					<div className='builder'>
						<div className='prompt__selector'>
							<Tabs>
								<TabList>
									{categories.map((category, i) => (
										<Tab key={category}>{category}</Tab>
									))}
								</TabList>
								{categories.map((category, i) => (
									<TabPanel key={category + i}>
										{prompts.map((prompt) => {
											return (
												prompt.category === category && (
													<PromptCard
														key={prompt.prompt}
														id={prompt.prompt}
														title={prompt.prompt}
														image={prompt.imgUrl}
														handleClick={(e) => handleClick(prompt, e)}
													/>
												)
											)
										})}
									</TabPanel>
								))}
							</Tabs>
						</div>
						<div className='collector__container'>
							<div className='tips'>
								<h1>Prompt Builder Tips</h1>
								<ul>
									<li>Tip 1</li>
									<li>Tip 2</li>
									<li>Tip 3</li>
								</ul>
							</div>
							<div className='prompt__collector'>
								<h2>Prompt Collector</h2>
								{selectedPrompts.length > 0 ? (
									<ul className='selected__prompts'>
										{selectedPrompts?.map((prompt) => (
											<li key={prompt} className='prompt'>
												{prompt}
												<CgCloseR
													className='delete'
													onClick={(e) => handleClick(prompt, e)}
												/>
											</li>
										))}
									</ul>
								) : (
									<button key={'button'} onClick={(e) => surpriseMe(e)}>
										Suprise Me!
									</button>
								)}

								<div className='options'>
									<div className='options__prompt'>
										<label>Add your own prompt:</label>
										<input
											className='add__input'
											type='text'
											id='custom__prompt'
											onKeyDown={(e) => handleEnterKey(e)}
										/>
										<button
											type='button'
											className='add'
											onClick={() => addCustomPrompt()}
										>
											+
										</button>
									</div>
									<div className='options__inputs'>
										<ResultsCount handleChange={handleFormFieldChange} />
										<SizeSlider handleChange={handleFormFieldChange} />
										<button type='button' onClick={(e) => handleSubmit(e)}>
											Generate
										</button>
									</div>
								</div>
							</div>
						</div>
						<Footer />
					</div>
				</div>
			)}
		</div>
	)
}

export default PromptBuilder
