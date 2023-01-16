import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { NavBar, PromptCard } from '../../components'
import { categories, lighting, energies, cameraSettings, media, artists, aesthetics, structure, filters } from '../../constants';

import 'react-tabs/style/react-tabs.css';
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
      </Tabs>
    </div>
  )
}

export default PromptBuilder