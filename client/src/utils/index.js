export const fetchResults = async ({ inputs, setImageData, setImageRetrieved, setIsLoading }) => {
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
    const resData = await response.json();
    const imageData = [];

    resData.images.data.forEach((image) => {
      imageData.push(image.url);
    });

    setImageData(imageData);
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

export const integerConversion = ({ inputs }) => {
  inputs.count = parseInt(inputs.count);
};
