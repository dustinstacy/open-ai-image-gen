import { useState } from "react";
import  './Form.css'

const Form = () => {
    const [inputs, setInputs] = useState('')
    const [data, setData] = useState({})
    const [imageRetrieved, setImageRetrieved] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInputs(inputs);
        console.log(inputs);

        const response = await fetch("http://localhost:5000", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: inputs,
            })
        });

        console.log(inputs);

        if (response.ok) {
            const data = await response.json();
            setData(data.images.data)
            setImageRetrieved(true);

        } else {
            const err = await response.text();
            alert(err);
        }
    }

    return (
        <div className="form">
            <div className="image__container">
                { imageRetrieved && (
                    data.map((src, idx) => (
                        <img key={src + idx} src={src.url} alt={inputs} />
                    )
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <label>Enter your prompt:
                <input
                    type="text"
                    onChange={(e) => setInputs(e.target.value)}
                    />
                <button type="submit">Submit</button>
                </label>
            </form>
        </div>
    )
}

export default Form;