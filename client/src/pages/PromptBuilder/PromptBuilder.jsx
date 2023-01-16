import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { NavBar, PromptCard } from '../../components'
import { categories, lighting, energies, cameraSettings, media, artists, aesthetics, structure, filters } from '../../constants';

import './PromptBuilder.css'

const handleClick = (e) => {
  console.log(e.target);
}


const PromptBuilder = () => {

  const promptArrays = [lighting, energies, cameraSettings, media, artists, aesthetics, structure, filters];

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
                  handleClick={(e) => handleClick(e)}
                />
            ))}
          </TabPanel>
        ))}
        <div className='prompt__collector'>
          <h2>Prompt Collector</h2>
          <button type="submit">Submit</button>
        </div>
      </Tabs>
    </div>
  )
}

export default PromptBuilder