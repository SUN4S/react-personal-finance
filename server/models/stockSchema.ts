import { DateTime } from "luxon";
import Joi from "joi";
import mongoose from "mongoose";

const BoughtStockSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId },
    ticker: {
      type: String,
      required: [true, "can't be blank"],
    },
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
    _id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId },
    ticker: {
      type: String,
      required: [true, "can't be blank"],
    },
    name: { type: String, required: true },
    exchange: { type: String, required: true },
    type: { type: String, Default: "" },
    locale: { type: String, required: true },
    currency: { type: String, required: true },
  },
  { collection: "stockData" }
);

const StockSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    favouriteStocks: { type: [HeldStockSchema], default: Array },
    stockTransactions: { type: [BoughtStockSchema], default: Array },
  },
  { collection: "stockData" }
);

export const joiAddStockFavouriteSchema = Joi.object({
  ticker: Joi.string().required().min(1),
  name: Joi.string().required(),
  exchange: Joi.string().required().min(1),
  type: Joi.string(),
  locale: Joi.string().required(),
  currency: Joi.string().required(),
});

export const joiAddStockTransactionSchema = Joi.object({
  ticker: Joi.string().required().min(1),
  amount: Joi.number().min(1).max(1000000).required(),
  date: Joi.date().required(),
  stockValue: Joi.number().required(),
});

export const joiStockIntervalSchema = Joi.object({
  ticker: Joi.string().required(),
  fromDate: Joi.string().required(),
  toDate: Joi.string().required(),
});

export const StockModel = mongoose.model("StockModel", StockSchema);
