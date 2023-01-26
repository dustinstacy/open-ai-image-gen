import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import { CgCloseR } from 'react-icons/cg';

import { PromptCard, ResultsCount, SizeSlider, Loader, ImageCard} from '../../components'
import { sizeConversion, integerConversion, fetchResults } from '../../utils';
import { promptArrays, categories } from '../../data';

import './PromptBuilder.scss'
import { useGlobalContext } from '../../context/GlobalContext';


const PromptBuilder = () => {
  const { user, promptHistory } = useGlobalContext();

  const [inputs, setInputs] = useState({
    prompt: '',
    count: "1",
    size: "1",
  })
  const [selectedPrompts, setSelectedPrompts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [imageRetrieved, setImageRetrieved] = useState(false)
  const [imageData, setImageData] = useState(null)

  const promptBuild = selectedPrompts.join(" ")

  const handleFormFieldChange = (fieldName, e) => {
    setInputs({ ...inputs, [fieldName]: e.target.value });
  };

  const handleClick = (prompt, e) => {
    const activePrompt = document.getElementById(prompt)
    const value = prompt.name;

    if (selectedPrompts.includes(prompt)) {
      setSelectedPrompts(selectedPrompts.filter((prompts) => prompts !== prompt));
      activePrompt.classList.remove('active__prompt');
    } else if (selectedPrompts.includes(prompt.name)) {
      e.target.classList.remove('active__prompt')
      setSelectedPrompts(selectedPrompts.filter((prompts) => prompts !== prompt.name));
    } else {
      e.target.classList.add('active__prompt');
      setSelectedPrompts([...selectedPrompts, value]);
    }

    setInputs({ ...inputs, prompt: promptBuild })
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

  useEffect(() => {
    const currentPrompts = inputs.prompt;
    if (currentPrompts !== promptBuild) {
      setInputs({ ...inputs, prompt: promptBuild });
    }
  }, [selectedPrompts, inputs, promptBuild])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageRetrieved(false);
    setIsLoading(true);
    integerConversion({ inputs })
    sizeConversion({ inputs })
    fetchResults({ inputs, setImageData, setImageRetrieved, setIsLoading });
  }


  useEffect(() => {
      if (user && imageRetrieved) {
          setImageRetrieved(false);
            axios.post("/api/history/new", { user: user._id, name: user.name, prompt: inputs.prompt, images: imageData });
      }
  }, [imageRetrieved, user, inputs, imageData])

  const reset = (e) => {
    e.preventDefault();
    setImageRetrieved(false);
    setImageData(null);
  }


  return (
    <div className='page'>

      {(imageData || isLoading) && (
        <div className="image__container">
          {isLoading && <Loader />}
          {imageData && (
        <div className='results'>
        <div className='history__collection'>
          <div className='history__images'>
            {imageData.map((image, i) => (
              <ImageCard id={image.slice(-10)} prompt={inputs.prompt} name={user.name} image={image} key={image} />
            ))}
          </div>
          <div className='history__prompt'>
            <p>{inputs.prompt}</p>
          </div>
              </div>
          <button onClick={(e) => reset(e)}>Try again?</button>
              </div>
          )}

        </div>
      )}


      {!imageData && !isLoading && (
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
            <button type="button" onClick={(e) => handleSubmit(e)}>Submit</button>
          </div>

        </div>

          </div>
      )}
    </div>
  )
}

export default PromptBuilder