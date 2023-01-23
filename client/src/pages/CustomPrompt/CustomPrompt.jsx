import { useEffect, useState } from "react";
import axios from "axios";

import { Loader, SizeSlider, ResultsCount } from "../../components";
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
        setImageRetrieved(false);
        setIsLoading(true);
        integerConversion({ inputs })
        sizeConversion({ inputs })
        fetchResults({ inputs, setImageData, setImageRetrieved, setIsLoading });
    }

    useEffect(() => {
        if (user && imageRetrieved) {
            setImageRetrieved(false);
            axios.post("/api/history/new", { prompt: inputs.prompt, user: user._id, images: imageData });
        }
    }, [imageRetrieved, user, inputs, imageData])

    return (
        <div className="page">
            <div className="image__container">
                {isLoading && <Loader />}
                { imageData &&  (
                    imageData.map((src, idx) => (
                        <img key={src + idx} src={src} alt={inputs.prompt} />
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