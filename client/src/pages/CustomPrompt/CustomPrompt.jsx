import { useState } from "react";

import { Loader, SizeSlider, ResultsCount } from "../../components";
import { fetchResults, integerConversion, sizeConversion } from "../../utils";

import  './CustomPrompt.scss'

const CustomPrompt = () => {
    const [inputs, setInputs] = useState({
        prompt: '',
        count: "1",
        size: "1",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [imageRetrieved, setImageRetrieved] = useState(false)
    const [data, setData] = useState({})

    const handleFormFieldChange = (fieldName, e) => {
        setInputs({ ...inputs, [fieldName]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageRetrieved(false);
        setIsLoading(true);
        integerConversion({ inputs })
        sizeConversion({ inputs })
        fetchResults({ inputs, setData, setImageRetrieved, setIsLoading });
    }

    return (
        <div className="page">
            <div className="image__container">
                {isLoading && <Loader />}
                { imageRetrieved && (
                    data.map((src, idx) => (
                        <img key={src + idx} src={src.url} alt={inputs.prompt} />
                    )
                ))}
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="prompt__input">
                <label>Enter your prompt:</label>
                <input
                    type="text"
                    placeholder="What will you discover?"
                    onChange={(e) => handleFormFieldChange('prompt', e)}
                />
                </div>
                <ResultsCount handleChange={handleFormFieldChange} />
                <SizeSlider handleChange={handleFormFieldChange} />
                <button type="submit">Generate</button>
            </form>
        </div>
    )
}

export default CustomPrompt;