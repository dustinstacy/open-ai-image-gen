const response = await openai.createImage({
  prompt: "a white siamese cat",
  n: 1,
  size: "1024x1024",
});
image_url = response.data.data[0].url;

const editResponse = await openai.createImageEdit(
  fs.createReadStream("sunlit_lounge.png"),
  fs.createReadStream("mask.png"),
  "A sunlit indoor lounge area with a pool containing a flamingo",
  1,
  "1024x1024"
);
image_url = editResponse.data.data[0].url;

const varResponse = await openai.createImageVariation(fs.createReadStream("corgi_and_cat_paw.png"), 1, "1024x1024");
image_url = varResponse.data.data[0].url;

// This is the Buffer object that contains your image data
const buffer = [];
// Set a `name` that ends with .png so that the API knows it's a PNG image
buffer.name = "image.png";
const bufferResponse = await openai.createImageVariation(buffer, 1, "1024x1024");

try {
  const response = await openai.createImageVariation(fs.createReadStream("image.png"), 1, "1024x1024");
  console.log(response.data.data[0].url);
} catch (error) {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log(error.message);
  }
}
