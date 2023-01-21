import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { GlobalProvider } from './context/GlobalContext';
import { CustomPrompt, PromptBuilder, Randomizer, Home } from './pages';
import { NavBar, AuthBox } from './components';

import './main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <Router>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prompt-builder" element={<PromptBuilder />} />
            <Route path="/randomizer" element={<Randomizer />} />
            <Route path="/custom-prompt" element={<CustomPrompt />} />
            <Route path="/login" element={<AuthBox />} />
            <Route path="/register" element={<AuthBox register/>} />
        </Routes>
      </Router>
    </GlobalProvider>
  </React.StrictMode>
)
