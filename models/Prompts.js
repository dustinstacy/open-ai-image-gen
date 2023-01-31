import { Schema, model } from "mongoose";

const PromptSchema = new Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

const Prompt = model("Prompt", PromptSchema);

export default Prompt;
