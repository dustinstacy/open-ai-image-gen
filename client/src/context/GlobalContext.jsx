import React, { createContext, useContext, useReducer, useEffect } from 'react'
import axios from 'axios'

const inititalState = {
	user: null,
	fetchingUser: true,
	prompts: [],
	promptHistory: [],
	favorites: [],
}

const globalReducer = (state, action) => {
	switch (action.type) {
		case 'SET_PROMPTS':
			return {
				...state,
				prompts: action.payload,
			}
		case 'SET_USER':
			return {
				...state,
				user: action.payload,
				fetchingUser: false,
			}
		case 'SET_HISTORY':
			return {
				...state,
				promptHistory: action.payload,
			}
		case 'SET_FAVORITES':
			return {
				...state,
				favorites: action.paylod,
			}
		case 'RESET_USER':
			return {
				user: null,
				fetchingUser: false,
				promptHistory: [],
			}
		default:
			return state
	}
}

const GlobalContext = createContext(inititalState)

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(globalReducer, inititalState)

	useEffect(() => {
		getCurrentUser()
		getPrompts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getPrompts = async () => {
		try {
			const res = await axios.get('/api/prompts')

			if (res.data) {
				dispatch({
					type: 'SET_PROMPTS',
					payload: res.data,
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	const getCurrentUser = async () => {
		try {
			const res = await axios.get('/api/auth/current')

			if (res.data) {
				dispatch({
					type: 'SET_USER',
					payload: res.data,
				})

				getPromptHistory()
			} else {
				dispatch({ type: 'RESET_USER' })
			}
		} catch (error) {
			console.log(error, 'No User')
			dispatch({ type: 'RESET_USER' })
		}
	}

	const getPromptHistory = async () => {
		try {
			const res = await axios.get('/api/history/current')

			if (res.data) {
				dispatch({
					type: 'SET_HISTORY',
					payload: res.data,
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	const logout = async () => {
		try {
			await axios.put('/api/auth/logout')
			dispatch({ type: 'RESET_USER' })
		} catch (error) {
			console.log(error)
			dispatch({ type: 'RESET_USER' })
		}
	}

	const markHistoryFavorite = (history) => {
		dispatch({
			type: 'SET_NON_FAVORITES',
			payload: state.favorites.filter(
				(favorite) => favorite._id !== history._id
			),
		})

		dispatch({
			type: 'SET_FAVORITES',
			payload: [history, ...state.favorites],
		})
	}

	const removeHistoryFavorite = (history) => {
		dispatch({
			type: 'REMOVE_FAVORITE',
			payload: state.favorites.filter(
				(favorite) => favorite._id !== history._id
			),
		})
	}

	const value = {
		...state,
		getCurrentUser,
		getPrompts,
		getPromptHistory,
		logout,
		markHistoryFavorite,
		removeHistoryFavorite,
	}

	return (
		<GlobalContext.Provider value={value}>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)
