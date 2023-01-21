import { Schema, model } from "mongoose";

const PromptHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    prompt: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const PromptHistory = model("PromptHistory", PromptHistorySchema);

export default PromptHistory;
