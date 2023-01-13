import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomPrompt, PromptBuilder, Randomizer, Home } from './pages';

import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompt-builder" element={<PromptBuilder />} />
        <Route path="/randomizer" element={<Randomizer />} />
        <Route path="/custom-prompt" element={<CustomPrompt />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
