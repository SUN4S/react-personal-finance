var uniqueValidator = require("mongoose-unique-validator");

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
      unique: true,
    },
    hash: { type: String, required: true },
    date: { type: Date, default: new Date() },
    image: { type: String, default: null },
  },
  { collection: "userData" }
);

UserSchema.plugin(uniqueValidator, { msg: "is already taken." });

export const UserModel = mongoose.model("UserModel", UserSchema);
