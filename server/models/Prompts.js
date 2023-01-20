import { Schema, model } from "mongoose";

const PromptSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: Image,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamp: true,
  }
);

export const Prompt = model("Prompt", PromptSchema);
