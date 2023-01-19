import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useNavigate } from 'react-router-dom';
import { CgCloseR } from 'react-icons/cg';

import { NavBar, PromptCard, ResultsCount, SizeSlider, Loader } from '../../components'
import { categories, lighting, energies, cameraSettings, media, artists, aesthetics, structure } from '../../constants';
import { sizeConversion, fetchResults } from '../../utils';
import './PromptBuilder.css'

const PromptBuilder = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    prompt: '',
    count: 1,
    size: "1",
  })
  const [data, setData] = useState({})
  const [imageRetrieved, setImageRetrieved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
      const promptBuild = selectedPrompts.join(" ")
      setInputs({ ...inputs, prompt: promptBuild })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageRetrieved(false);
    setIsLoading(true);
    sizeConversion({ inputs })
    fetchResults({ inputs, setData, setImageRetrieved, setIsLoading });
  }

  const reset = (e) => {
    e.preventDefault();
    setImageRetrieved(false)
  }


  return (
    <div className='container'>
      <NavBar />

      <div className="image__container">
        {isLoading && <Loader />}
        {imageRetrieved && (
          <div className='results'>
            <div className='images'>
              {data.map((src, idx) => (
                <img key={src + idx} src={src.url} alt={inputs.prompt} />
              ))}
            </div>
            <div>
              <button type="button" onClick={(e) => reset(e)}>Try Again?</button>
            </div>
          </div>
        )}
      </div>


      {!imageRetrieved && !isLoading && (
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
              <CgCloseR className='delete' onClick={(e) => handleClick(prompt, e)} />
            </li>
          ))}
          </ul>
          <div className='options'>
            <ResultsCount setInputs={setInputs} inputs={inputs} />
            <SizeSlider setInputs={setInputs} inputs={inputs} />
          </div>
          <button type="button" onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
        </Tabs>
      )}
    </div>
  )
}

export default PromptBuilder