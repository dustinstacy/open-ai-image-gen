import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { NavBar, PromptCard } from '../../components'
import { categories, lighting, energies, cameraSettings, media, artists, aesthetics, structure } from '../../constants';

import './PromptBuilder.css'

const PromptBuilder = () => {
  const [selectedPrompts, setSelectedPrompts] = useState([])
  const promptArrays = [lighting, energies, aesthetics, cameraSettings, artists, structure, media];

  const handleClick = (prompt, e) => {
    const value = prompt.name;
    setSelectedPrompts([...selectedPrompts, value]);
    e.target.classList.add('active__prompt');
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
          <ul>
          {selectedPrompts?.map((prompt) => (
            <li key={prompt}>
              {prompt}
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