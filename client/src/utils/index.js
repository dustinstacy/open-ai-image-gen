export const fetchResults = async ({ inputs, setData, setImageRetrieved, setIsLoading }) => {
  const response = await fetch("http://localhost:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: inputs.prompt,
      count: inputs.count,
      size: inputs.size,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    setData(data.images.data);
    setImageRetrieved(true);
    setIsLoading(false);
  } else {
    const err = await response.text();
    alert(err);
  }
};

export const sizeConversion = ({ inputs }) => {
  if (inputs.size === "1") {
    inputs.size = "256x256";
  } else if (inputs.size === "2") {
    inputs.size = "512x512";
  } else if (inputs.size === "3") {
    inputs.size = "1024x1024";
  }
};

export const handleFormFieldChange = ({ setInputs: setInputs, inputs: inputs }, fieldName, e) => {
  setInputs({ ...inputs, [fieldName]: e.target.value });
};
