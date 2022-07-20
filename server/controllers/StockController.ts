import { Request, Response } from "express";
import {
  joiAddStockFavouriteSchema,
  joiAddStockTransactionSchema,
  joiStockIntervalSchema,
} from "../models/stockSchema";

import { DateTime } from "luxon";
import { StockModel } from "../models/stockSchema";
import axios from "axios";
import logger from "../config/winston";
import mongoose from "mongoose";

// Function to get Reqeusted company interday data
// Stock data taken from database (favourites)
export const getStockData = async (req: Request, res: Response) => {
  // passportJS function to check if user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorizes access" });
  }

  const currentDate = DateTime.now().toFormat("yyyy-MM-dd");
  const weekBeforeDate = DateTime.now().minus({ week: 1 }).toFormat("yyyy-MM-dd");

  try {
    const stocks = await StockModel.findOne({ userid: req.user.id });
    let dataArray = [];

    await Promise.allSettled(
      stocks.heldStock.map(async (item) => {
        const response = await axios.get(
          `https://api.polygon.io/v2/aggs/ticker/${item.ticker}/range/2/hour/${weekBeforeDate}/${currentDate}?adjusted=true&sort=asc&apiKey=${process.env.POLYGONIO_API_KEY}`
        );
        const data = await response.data;
        const newObject = {
          ticker: data.ticker,
          boughtStock: item.boughtStock,
          results: data.results,
        };
        dataArray.push(newObject);
      })
    );
    logger.info(`${req.user.username} Requested Stock Data`);
    return res.status(200).send(dataArray);
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// Function to get Reqeusted company interday data
/*
  body: {
    ticker: string,
    fromDate: string,
    toDate: string
  }
*/
export const getStockDataWithInterval = async (req: Request, res: Response) => {
  // passportJS function to check if user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorizes access" });
  }

  const ticker = req.body.ticker;
  const weekBeforeDate = req.body.fromDate;
  const currentDate = req.body.toDate;

  const data = joiStockIntervalSchema.validate({
    ticker: ticker,
    fromDate: weekBeforeDate,
    toDate: currentDate,
  });

  if (data.error) {
    return res.status(400).json({ msg: data.error.message });
  }

  try {
    const response = await axios.get(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/2/hour/${weekBeforeDate}/${currentDate}?adjusted=true&sort=asc&apiKey=${process.env.POLYGONIO_API_KEY}`
    );

    logger.info(`${req.user.username} Requested Stock Data`);
    return res.status(200).json({ results: response.data.results });
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// Function to get stock data by query string
/*
  body: {
    query: string
  }
*/
export const findStockData = async (req: Request, res: Response) => {
  // passportJS function to check if user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorizes access" });
  }

  const query = req.body.query;

  if (query === null || query === undefined || query === "") {
    return res.status(400).json({ msg: "Bad Query Format" });
  }

  try {
    const response = await axios.get(
      `https://api.polygon.io/v3/reference/tickers?market=stocks&search=${query}&active=true&sort=ticker&order=asc&limit=10&apiKey=${process.env.POLYGONIO_API_KEY}`
    );

    logger.info(`${req.user.username} Requested Stock Data`);
    return res.status(200).json({ results: response.data.results });
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// Function to add a favourite stock
/*
  body: {
    ticker: string,
    name: string,
    exchange: string,
    type: string,
    locale: string,
    currency: string
  }
*/
export const addFavouriteStock = async (req: Request, res: Response) => {
  // passportJS function to check if user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorizes access" });
  }

  const ticker = req.body.ticker;
  const name = req.body.name;
  const exchange = req.body.exchange;
  const type = req.body.type;
  const locale = req.body.locale;
  const currency = req.body.currency;

  const data = joiAddStockFavouriteSchema.validate({
    ticker: ticker,
    name: name,
    exchange: exchange,
    type: type,
    locale: locale,
    currency: currency,
  });

  if (data.error) {
    return res.status(400).json({ msg: data.error.message });
  }

  try {
    const stocks = await StockModel.findOneAndUpdate(
      {
        userid: req.user.id,
      },
      {
        $push: {
          heldStock: {
            ticker: ticker,
            name: name,
            exchange: exchange,
            type: type,
            locale: locale,
            currency: currency,
            boughtStock: [],
          },
        },
      }
    );

    logger.info(`${req.user.username} Added Favourite Stock`);
    return res.status(200).json({ msg: "Successfully Added Favourite" });
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// Function to remove a favourite stock
/*
  body: {
    id: string,
  }
*/
export const removeFavouriteStock = async (req: Request, res: Response) => {
  // passportJS function to check if user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorizes access" });
  }

  try {
    const stocks = await StockModel.findOne({ "heldStock._id": req.body.id });
    console.log(stocks);

    logger.info(`${req.user.username} Removed Favourite Stock`);
    return res.status(200).json({ msg: "Successfully Removed Favourite" });
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// Function to add held stock transactions
/*
  body: {
    ticker: string,
    amount: number,
    date: date,
    stockValue: number
  }
*/
export const addStockTransaction = async (req: Request, res: Response) => {
  // passportJS function to check if user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorizes access" });
  }

  const ticker = req.body.ticker;
  const amount = req.body.amount;
  const date = req.body.date;
  const stockValue = req.body.stockValue;

  const data = joiAddStockTransactionSchema.validate({
    amount: amount,
    date: date,
    stockValue: stockValue,
  });

  if (data.error) {
    return res.status(400).json({ msg: data.error.message });
  }

  try {
    const stocks = await StockModel.findOneAndUpdate(
      {
        $and: [{ userid: req.user.id }, { heldStock: { $elemMatch: { ticker: ticker } } }],
      },
      {
        $push: {
          "heldStock.$.boughtStock": {
            amount: amount,
            date: date.toString(),
            stockValue: stockValue,
          },
        },
      }
    );

    logger.info(`${req.user.username} Added Stock Transaction`);
    return res.status(200).json({ msg: "Successfully Added Transaction" });
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};
