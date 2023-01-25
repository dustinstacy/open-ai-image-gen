import { Schema, model } from "mongoose";

const PromptHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PromptHistory = model("PromptHistory", PromptHistorySchema);

export default PromptHistory;
