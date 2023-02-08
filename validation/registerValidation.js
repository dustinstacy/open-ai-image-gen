import validator from 'validator'
import isEmpty from './isEmpty.js'

const validateRegisterInput = (data) => {
	let errors = {}

	if (isEmpty(data.name)) {
		errors.name = 'Name field cannot be empty'
	} else if (!validator.isLength(data.name, { min: 2, max: 25 })) {
		errors.name = 'Name must be between 2 and 25 characters long'
	}

	if (isEmpty(data.email)) {
		errors.email = 'Email field cannot be empty'
	} else if (!validator.isEmail(data.email)) {
		errors.email = 'Email is invalid, please provide a valid email'
	}

	if (isEmpty(data.password)) {
		errors.password = 'Password field cannot be empty'
	} else if (!validator.isLength(data.password, { min: 6, max: 150 })) {
		errors.password = 'Password must be between 6 and 150 characters long'
	}

	if (isEmpty(data.confirmPassword)) {
		errors.confirmPassword = 'Confirm password field cannot be empty'
	} else if (!validator.equals(data.password, data.confirmPassword)) {
		errors.confirmPassword = 'Passwords do not match'
	}

	return {
		errors,
		isValid: isEmpty(errors),
	}
}

export default validateRegisterInput
