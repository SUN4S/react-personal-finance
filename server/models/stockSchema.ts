import { DateTime } from "luxon";
import Joi from "joi";
import mongoose from "mongoose";

const BoughtStockSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "can't be blank"],
    },
    date: {
      type: String,
      default: DateTime.now().toISO(),
    },
    stockValue: {
      type: Number,
      required: true,
    },
  },
  { collection: "stockData" }
);

const HeldStockSchema = new mongoose.Schema(
  {
    ticker: {
      type: String,
      required: [true, "can't be blank"],
    },
    name: { type: String, required: true },
    exchange: { type: String, required: true },
    type: { type: String, Default: "" },
    locale: { type: String, required: true },
    currency: { type: String, required: true },
    boughtStock: { type: [BoughtStockSchema], default: Array },
  },
  { collection: "stockData" }
);

const StockSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    heldStock: { type: [HeldStockSchema], default: Array },
  },
  { collection: "stockData" }
);

export const joiAddStockFavouriteSchema = Joi.object({
  ticker: Joi.string().required().min(1).max(6),
  name: Joi.string().required(),
  exchange: Joi.string().required().min(1).max(6),
  type: Joi.string(),
  locale: Joi.string().required(),
  currency: Joi.string().required(),
});

export const joiAddStockTransactionSchema = Joi.object({
  amount: Joi.number().min(1).max(1000000).required(),
  date: Joi.date(),
  stockValue: Joi.number(),
});

export const joiStockIntervalSchema = Joi.object({
  ticker: Joi.string().required(),
  fromDate: Joi.string().required(),
  toDate: Joi.string().required(),
});

export const StockModel = mongoose.model("StockModel", StockSchema);
