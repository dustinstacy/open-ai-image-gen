import { useEffect, useState } from "react";
import axios from "axios";

import { Loader, SizeSlider, ResultsCount, ImageCard } from "../../components";
import { fetchResults, integerConversion, sizeConversion } from "../../utils";
import { useGlobalContext } from "../../context/GlobalContext";

import  './CustomPrompt.scss'

const CustomPrompt = () => {
    const { user } = useGlobalContext();

    const [inputs, setInputs] = useState({
        prompt: '',
        count: "1",
        size: "1",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [imageData, setImageData] = useState(null)
    const [imageRetrieved, setImageRetrieved] = useState(false)


    const handleFormFieldChange = (fieldName, e) => {
        setInputs({ ...inputs, [fieldName]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageData(false);
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

    return (
        <div className="page">
            <div className="custom__container">
            <div className="image__container">
                {isLoading && <Loader />}
                { imageData &&  (
                    imageData.map((image, idx) => (
                         <ImageCard id={image + idx} prompt={inputs.prompt} image={image} name={user.name} key={image} />
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
        </div>
    )
}

export default CustomPrompt;