import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import axios from 'axios'

import { useGlobalContext } from '../../context/GlobalContext'
import { Footer } from '../../components'

import './AuthBox.scss'

const AuthBox = ({ register }) => {
	const navigate = useNavigate()
	const { getCurrentUser, getPrompts, user } = useGlobalContext()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [passwordVisisble, setPasswordVisisble] = useState(false)
	const [confirmPasswordVisisble, setConfirmPasswordVisisble] =
		useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})

	useEffect(() => {
		if (user) {
			getCurrentUser()
			getPrompts()
			navigate('/home')
		}
	}, [user, navigate, getCurrentUser, getPrompts])

	const onSubmit = (e) => {
		e.preventDefault()
		// used to disable multiple submissions
		setLoading(true)

		let data = {}

		// values gathered from user input
		if (register) {
			data = {
				name,
				email,
				password,
				confirmPassword,
			}
		} else {
			data = {
				email,
				password,
			}
		}

		axios
			.post(register ? '/api/auth/register' : '/api/auth/login', data)
			.then(() => {
				getCurrentUser()
			})
			.catch((error) => {
				setLoading(false)
				if (error?.response?.data) {
					setErrors(error.response.data)
				}
			})
	}

	return (
		<div className='auth'>
			<div className='auth__box'>
				<div className='auth__title'>
					<h1>{register ? 'Register' : 'Login'}</h1>
				</div>
				<form onSubmit={onSubmit}>
					{register && (
						<div className='auth__field'>
							<label>Username</label>
							<input
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								autoFocus
							/>
							{errors.name && (
								<p className='auth__error'>{errors.name}</p>
							)}
						</div>
					)}
					<div className='auth__field'>
						<label>Email</label>
						<input
							type='text'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoFocus
						/>
						{errors.email && (
							<p className='auth__error'>{errors.email}</p>
						)}
					</div>
					<div className='auth__field'>
						<label>Password</label>
						<div className='password'>
							<input
								type={passwordVisisble ? 'text' : 'password'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{passwordVisisble ? (
								<AiFillEye
									onClick={() =>
										setPasswordVisisble(
											(current) => !current
										)
									}
								/>
							) : (
								<AiFillEyeInvisible
									onClick={() =>
										setPasswordVisisble(
											(current) => !current
										)
									}
								/>
							)}
						</div>
						{errors.password && (
							<p className='auth__error'>{errors.password}</p>
						)}
					</div>
					{register && (
						<div className='auth__field'>
							<label>Confirm Password</label>
							<div className='password'>
								<input
									type={
										confirmPasswordVisisble
											? 'text'
											: 'password'
									}
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
								/>
								{confirmPasswordVisisble ? (
									<AiFillEye
										onClick={() =>
											setConfirmPasswordVisisble(
												(current) => !current
											)
										}
									/>
								) : (
									<AiFillEyeInvisible
										onClick={() =>
											setConfirmPasswordVisisble(
												(current) => !current
											)
										}
									/>
								)}
							</div>
							{errors.confirmPassword && (
								<p className='auth__error'>
									{errors.confirmPassword}
								</p>
							)}
						</div>
					)}
					<div className='auth__footer'>
						{Object.keys(errors).length > 0 && (
							<p className='auth__error'>
								{register
									? 'Information could not be validated'
									: "That's not right"}
							</p>
						)}
						<button type='submit' disabled={loading}>
							{register ? 'Register' : 'Login'}
						</button>
					</div>
				</form>
				{!register && (
					<div className='auth__register'>
						<span>Not a member? </span>
						<NavLink to='../register'>Sign up</NavLink>
					</div>
				)}
			</div>
			<Footer />
		</div>
	)
}

export default AuthBox
