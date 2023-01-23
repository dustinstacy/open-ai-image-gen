import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { GlobalProvider } from './context/GlobalContext';
import { CustomPrompt, PromptBuilder, Home, History } from './pages';
import { NavBar, AuthBox } from './components';

import "./App.scss"

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prompt-builder" element={<PromptBuilder />} />
            <Route path="/custom-prompt" element={<CustomPrompt />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<AuthBox />} />
            <Route path="/register" element={<AuthBox register/>} />
        </Routes>
      </Router>
    </GlobalProvider>
  )
}

export default App