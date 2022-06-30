import { DateTime } from "luxon";
import Joi from "joi";
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
    date: {
      type: Date,
      default: DateTime.now().setZone("Europe/London").toISO(),
    },
    image: { type: String, default: null },
  },
  { collection: "userData" }
);

const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError = new Error(
  "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length"
);

export const joiUserSchema = Joi.object({
  username: Joi.string().min(5).max(32).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(strongPasswordRegex).error(stringPassswordError).required(),
});

export const UserModel = mongoose.model("UserModel", UserSchema);
