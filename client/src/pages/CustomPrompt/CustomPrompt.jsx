import { useState } from "react";
import { NavBar } from "../../components";
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

    const handleFormFieldChange = (fieldName, e) => {
        setInputs({ ...inputs, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageRetrieved(false);
        setIsLoading(true);

        if (inputs.size === "1") {
            inputs.size = "256x256";
        } else if (inputs.size === "2") {
            inputs.size = "512x512";
        } else if (inputs.size === "3") {
            inputs.size = "1024x1024";
        }
        setInputs(inputs);

        const response = await fetch("http://localhost:5000", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: inputs.prompt,
                count: inputs.count,
                size: inputs.size,
            })
        });

        console.log(inputs);

        if (response.ok) {
            const data = await response.json();
            setData(data.images.data)
            setImageRetrieved(true);
            setIsLoading(false);

        } else {
            const err = await response.text();
            alert(err);
        }
    }

    return (
        <>
        <NavBar />
        <div className="custom">
            <div className="image__container">
                {isLoading && (
                    <div>Loading...</div>
                )}
                { imageRetrieved && (
                    data.map((src, idx) => (
                        <img key={src + idx} src={src.url} alt={inputs.prompt} />
                    )
                ))}
            </div>

            <form className="form" onSubmit={handleSubmit}>
                <label>Enter your prompt:
                    <input
                        className="prompt"
                        type="text"
                        onChange={(e) => handleFormFieldChange('prompt', e)}
                    />
                </label>
                <label># of results:
                    <input
                        className="count"
                        type='number'
                        step="1"
                        min='1'
                        max='4'
                        defaultValue='1'
                        onChange={(e) => handleFormFieldChange('count', e)}
                    />
                </label>
                <label>Size:
                    <div className="size_div">
                        <input
                            className="size"
                            type='range'
                            min='1'
                            max='3'
                            defaultValue='1'
                            list="sizes"
                            onChange={(e) => handleFormFieldChange('size', e)}
                        />
                        <datalist id='sizes'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </datalist>
                        <span>
                            <p>SM</p>
                            <p>MED</p>
                            <p>LG</p>
                        </span>
                    </div>
                </label>
                <button className="btn__generate" type="submit">Generate</button>
            </form>

            </div>
        </>
    )
}

export default CustomPrompt;