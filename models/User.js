import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    permissions: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export the model
const User = model("User", UserSchema);

export default User;
