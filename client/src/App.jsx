import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { GlobalProvider } from './context/GlobalContext'
import { CustomPrompt, PromptBuilder, Home, History } from './pages'
import { AuthBox, NavBar } from './components'

import './App.scss'

const App = () => {
	return (
		<GlobalProvider>
			<Router>
				<NavBar />
				<Routes>
					<Route path='/' element={<AuthBox />} />
					<Route path='/register' element={<AuthBox register />} />
					<Route path='/home' element={<Home />} />
					<Route path='/prompt-builder' element={<PromptBuilder />} />
					<Route path='/custom-prompt' element={<CustomPrompt />} />
					<Route path='/history' element={<History />} />
				</Routes>
			</Router>
		</GlobalProvider>
	)
}

export default App
