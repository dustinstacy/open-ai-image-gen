import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CgCloseR } from 'react-icons/cg';

import { PromptCard, ResultsCount, SizeSlider, Loader } from '../../components'
import { categories, lighting, energies, cameraSettings, media, artists, aesthetics, structure } from '../../constants';
import { sizeConversion, integerConversion, fetchResults } from '../../utils';

import './PromptBuilder.scss'


const PromptBuilder = () => {
  const [inputs, setInputs] = useState({
    prompt: '',
    count:"1",
    size: "1",
  })
  const [selectedPrompts, setSelectedPrompts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [imageRetrieved, setImageRetrieved] = useState(false)
  const [data, setData] = useState({})

  const promptArrays = [lighting, energies, aesthetics, cameraSettings, artists, structure, media];

  useEffect(() => {
    const promptBuild = selectedPrompts.join(" ")
    setInputs({...inputs, prompt: promptBuild})
  }, [selectedPrompts, inputs])

  const handleFormFieldChange = (fieldName, e) => {
    setInputs({ ...inputs, [fieldName]: e.target.value });
    console.log(inputs);
  };

  const handleClick = (prompt, e) => {
    const activePrompt = document.getElementById(prompt)
    const value = prompt.name;

    if (selectedPrompts.includes(prompt)) {
      setSelectedPrompts(selectedPrompts.filter((prompts) => prompts !== prompt));
      activePrompt.classList.remove('active__prompt');
    } else if(selectedPrompts.includes(prompt.name)) {
      e.target.classList.remove('active__prompt')
      setSelectedPrompts(selectedPrompts.filter((prompts) => prompts !== prompt.name));
    } else {
      e.target.classList.add('active__prompt');
      setSelectedPrompts([...selectedPrompts, value]);
    }
  }

  const addCustomPrompt = () => {
    const customPrompt = document.getElementById('custom__prompt');
    setSelectedPrompts([...selectedPrompts, customPrompt.value])
    customPrompt.value = '';
  }

  const handleEnterKey = (e) => {
    const customPrompt = document.getElementById('custom__prompt');
    if (e.key === 'Enter' && customPrompt.value.length > 0) {
      addCustomPrompt();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageRetrieved(false);
    setIsLoading(true);
    integerConversion({ inputs })
    sizeConversion({ inputs })
    fetchResults({ inputs, setData, setImageRetrieved, setIsLoading });
  }

  const reset = (e) => {
    e.preventDefault();
    setImageRetrieved(false)
  }


  return (
    <div className='page'>
      {isLoading && <Loader />}
      {imageRetrieved && (
      <div className="image__container">
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
      )}


      {!imageRetrieved && !isLoading && (
        <div className='builder__container'>
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
                  handleClick={(e) => handleClick(prompt, e)}
                />
            ))}
          </TabPanel>
        ))}
              </Tabs>
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
            <label>Add your own prompt:</label>
              <input
                className="add__prompt"
                type="text"
                id="custom__prompt"
                onKeyDown={(e) => handleEnterKey(e)}
                />
              <button type="button" className='add' onClick={() => addCustomPrompt()}>+</button>

            <ResultsCount handleChange={handleFormFieldChange} />
            <SizeSlider handleChange={handleFormFieldChange} />
          </div>
          <button type="button" onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>

          </div>
      )}

    </div>
  )
}

export default PromptBuilder