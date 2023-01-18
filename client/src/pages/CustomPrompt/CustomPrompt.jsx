import { useState } from "react";
import { Loader, NavBar, SizeSlider } from "../../components";
import ResultsCount from "../../components/ResultsCount/ResultsCount";
import { fetchResults, sizeConversion, handleFormFieldChange } from "../../utils";
import  './CustomPrompt.css'

const CustomPrompt = () => {
    const [inputs, setInputs] = useState({
        prompt: '',
        count: 1,
        size: "1",
    })
    const [data, setData] = useState({})
    const [imageRetrieved, setImageRetrieved] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageRetrieved(false);
        setIsLoading(true);
        sizeConversion({ inputs })
        fetchResults({ inputs, setData, setImageRetrieved, setIsLoading });
    }

    return (
        <div className="container">
            <NavBar />

            <div className="image__container">
                {isLoading && <Loader />}
                { imageRetrieved && (
                    data.map((src, idx) => (
                        <img key={src + idx} src={src.url} alt={inputs.prompt} />
                    )
                ))}
            </div>

            <form className="form" onSubmit={handleSubmit}>
                <label>Enter your prompt:
                    <input
                        className="prompt__input"
                        type="text"
                        placeholder="What will you discover?"
                        onChange={(e) => handleFormFieldChange({ setInputs, inputs }, 'prompt', e)}
                    />
                </label>
                <ResultsCount setInputs={setInputs} inputs={inputs} />
                <SizeSlider setInputs={setInputs} inputs={inputs} />
                <button className="btn__generate" type="submit">Generate</button>
            </form>

        </div>
    )
}

export default CustomPrompt;