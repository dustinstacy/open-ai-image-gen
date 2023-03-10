import FileSaver from 'file-saver'

export const fetchResults = async ({
	inputs,
	setImageData,
	setImageRetrieved,
}) => {
	const response = await fetch('/api/dalle', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			prompt: inputs.prompt,
			count: inputs.count,
			size: inputs.size,
		}),
	})

	if (response.ok) {
		const resData = await response.json()
		const imageData = []

		resData.images.data.forEach((image) => {
			imageData.push(image.url)
		})

		setImageData(imageData)
		setImageRetrieved(true)
	} else {
		const err = await response.text()
		alert(err)
	}
}

export const fetchVariants = async ({
	image,
	inputs,
	setImageData,
	setImageRetrieved,
}) => {
	const response = await fetch('/api/dalle/variants', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			image: image,
			count: inputs.count,
			size: inputs.size,
		}),
	})

	if (response.ok) {
		const resData = await response.json()
		const imageData = []

		resData.images.data.forEach((image) => {
			imageData.push(image.url)
		})

		setImageData(imageData)
		setImageRetrieved(true)
	} else {
		const err = await response.text()
		alert(err)
	}
}

export const sizeConversion = ({ inputs }) => {
	if (inputs.size === '1') {
		inputs.size = '256x256'
	} else if (inputs.size === '2') {
		inputs.size = '512x512'
	} else if (inputs.size === '3') {
		inputs.size = '1024x1024'
	}
}

export const integerConversion = ({ inputs }) => {
	inputs.count = parseInt(inputs.count)
}

export const openInNewWindow = (image) => {
	window.open(image, '_blank', 'noreferrer')
}

export const downloadImage = (image, _id) => {
	FileSaver.saveAs(image, `download-${_id}.jpg`)
}
