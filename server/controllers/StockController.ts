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

  // Defining dates and formating them to be used for API request
  const currentDate = DateTime.now().toFormat("yyyy-MM-dd");
  const weekBeforeDate = DateTime.now().minus({ week: 1 }).toFormat("yyyy-MM-dd");

  try {
    // mongoose request to db to get stock data for user
    const stocks = await StockModel.findOne({ userid: req.user.id });
    let dataArray = [];

    // Waiting for map to complete all promises
    await Promise.allSettled(
      stocks.favouriteStocks.map(async (item) => {
        // Calling api request to get data for users favourite stocks
        const response = await axios.get(
          `https://api.polygon.io/v2/aggs/ticker/${item.ticker}/range/2/hour/${weekBeforeDate}/${currentDate}?adjusted=true&sort=asc&apiKey=${process.env.POLYGONIO_API_KEY}`
        );

        // filtering transactions to only current ticker ones
        const filtererArray = stocks.stockTransactions.filter(
          (transaction) => transaction.ticker === item.ticker
        );

        // creating a new object to be pushed to array
        const newObject = {
          ticker: response.data.ticker,
          stockTransactions: filtererArray,
          results: response.data.results,
        };

        // pushing new object to array
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

  // Defining all variables from request body
  const ticker = req.body.ticker;
  const weekBeforeDate = req.body.fromDate;
  const currentDate = req.body.toDate;

  // validating provided data using joi
  const data = joiStockIntervalSchema.validate({
    ticker: ticker,
    fromDate: weekBeforeDate,
    toDate: currentDate,
  });

  // if joi validation fails, return error
  if (data.error) {
    return res.status(400).json({ msg: data.error.message });
  }

  try {
    // api request to return specific stocks data by provided time interval
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

  // defining variables from request body
  const query = req.body.query;

  // verifying if query contains any usefull tada
  if (query === null || query === undefined || query === "") {
    return res.status(400).json({ msg: "Bad Query Format" });
  }

  try {
    // api request to return stock data by provided query
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

  // defining variables from request body
  const ticker = req.body.ticker;
  const name = req.body.name;
  const exchange = req.body.exchange;
  const type = req.body.type;
  const locale = req.body.locale;
  const currency = req.body.currency;

  // joi validation to check if provided variables are acceptable
  const data = joiAddStockFavouriteSchema.validate({
    ticker: ticker,
    name: name,
    exchange: exchange,
    type: type,
    locale: locale,
    currency: currency,
  });

  // if joi validation fails, return error message
  if (data.error) {
    return res.status(400).json({ msg: data.error.message });
  }

  try {
    // mongoose query to push new object into favourite stock array
    const stocks = await StockModel.findOneAndUpdate(
      {
        userid: req.user.id,
      },
      {
        $push: {
          favouriteStocks: {
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
  Params :id(string),
*/
export const removeFavouriteStock = async (req: Request, res: Response) => {
  // passportJS function to check if user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorizes access" });
  }

  try {
    // mongoose query to pull favourite stock object from array
    const stocks = await StockModel.findOneAndUpdate(
      { userid: req.user.id },
      {
        $pull: { favouriteStocks: { _id: req.params.id } },
      }
    );

    logger.info(`${req.user.username} Removed Favourite Stock`);
    return res.status(200).json({ msg: "Successfully Removed Favourite" });
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// Function to add stock transactions
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

  // defining variables from request body
  const ticker = req.body.ticker;
  const amount = req.body.amount;
  const date = req.body.date;
  const stockValue = req.body.stockValue;

  // joi validation for provided data
  const data = joiAddStockTransactionSchema.validate({
    ticker: ticker,
    amount: amount,
    date: date,
    stockValue: stockValue,
  });

  // if joi validation fails, return error message
  if (data.error) {
    return res.status(400).json({ msg: data.error.message });
  }

  try {
    // mongoose query to push stock transaction object to array
    const stocks = await StockModel.findOneAndUpdate(
      {
        userid: req.user.id,
      },
      {
        $push: {
          stockTransactions: {
            ticker: ticker,
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

// Function to edit stock transactions
/*
  body: {
    _id: string,
    ticker: string,
    amount: number,
    date: date,
    stockValue: number
  }
*/
export const editStockTransaction = async (req: Request, res: Response) => {
  // passportJS function to check if user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorizes access" });
  }

  // defining variables from request body
  const id = req.body._id;
  const ticker = req.body.ticker;
  const amount = req.body.amount;
  const date = req.body.date;
  const stockValue = req.body.stockValue;

  // joi validation for provided data
  const data = joiAddStockTransactionSchema.validate({
    ticker: ticker,
    amount: amount,
    date: date,
    stockValue: stockValue,
  });

  // check if joi validation passed, if not return error
  if (data.error) {
    return res.status(400).json({ msg: data.error.message });
  }

  try {
    // mongoose query to update stock transaction by id
    const stocks = await StockModel.findOneAndUpdate(
      {
        stockTransactions: { $elemMatch: { _id: id } },
      },
      {
        $set: {
          "stockTransactions.$.ticker": ticker,
          "stockTransactions.$.amount": amount,
          "stockTransactions.$.date": date,
          "stockTransactions.$.stockValue": stockValue,
        },
      }
    );

    logger.info(`${req.user.username} Edited Stock Transaction`);
    return res.status(200).json({ msg: "Successfully Edited Transaction" });
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// Function to edit held stock transactions
/*
  Params :id(string),
*/
export const removeStockTransaction = async (req: Request, res: Response) => {
  // passportJS function to check if user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorizes access" });
  }

  // defining variables from request body
  const id = req.params.id;

  try {
    // mongoose query to pull stock transaction from array
    const stocks = await StockModel.findOneAndUpdate(
      {
        userid: req.user.id,
      },
      {
        $pull: { stockTransactions: { _id: id } },
      }
    );

    logger.info(`${req.user.username} Removed Stock Transaction`);
    return res.status(200).json({ msg: "Successfully Removed Transaction" });
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};
