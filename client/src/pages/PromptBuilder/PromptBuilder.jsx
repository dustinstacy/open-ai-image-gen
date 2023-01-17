import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { NavBar, PromptCard } from '../../components'
import { categories, lighting, energies, cameraSettings, media, artists, aesthetics, structure } from '../../constants';

import './PromptBuilder.css'

const PromptBuilder = () => {
  const [selectedPrompts, setSelectedPrompts] = useState([])
  const promptArrays = [lighting, energies, aesthetics, cameraSettings, artists, structure, media];

  const handleClick = (prompt, e) => {
    if (selectedPrompts.includes(prompt)) {
      setSelectedPrompts(selectedPrompts.filter((prompts) => prompts !== prompt));
      const activePrompt = document.getElementById(prompt)
      activePrompt.classList.remove('active__prompt');
    } else if(selectedPrompts.includes(prompt.name)) {
      promptArrays.forEach((category) => {
        category.forEach((i) => {
          if (i === prompt) {
            e.target.classList.remove('active__prompt')
            setSelectedPrompts(selectedPrompts.filter((prompts) => prompts !== prompt.name));
          }
        })
      })
    } else {
      const value = prompt.name;
      setSelectedPrompts([...selectedPrompts, value]);
      e.target.classList.add('active__prompt');
    }
  }

  return (
    <div className='container'>
      <NavBar />
      <Tabs>
        <TabList>
          {categories.map((category, i) => (
            <Tab key={category}>{category}</Tab>
          ))}
        </TabList>

        {promptArrays.map((category, i) => (
          <TabPanel key={i}>
            {category.map((prompt) => (
                <PromptCard
                  key={prompt.name}
                  id={prompt.name}
                  title={prompt.name}
                  image={prompt.imgUrl}
                  details={prompt.description}
                  handleClick={(e) => handleClick(prompt, e)}
                />
            ))}
          </TabPanel>
        ))}
        <div className='prompt__collector'>
          <h2>Prompt Collector</h2>
          <ul className='selected__prompts'>
          {selectedPrompts?.map((prompt) => (
            <li key={prompt} className="prompt">
              {prompt}
              <span className='delete' onClick={(e) => handleClick(prompt, e)}>X</span>
            </li>
          ))}
          </ul>
          <button type="submit">Submit</button>
        </div>
      </Tabs>
    </div>
  )
}

export default PromptBuilder