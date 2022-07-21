import {
  addFavouriteStock,
  addStockTransaction,
  findStockData,
  getStockData,
  getStockDataWithInterval,
  removeFavouriteStock,
} from "../controllers/StockController";

import express from "express";

const router = express.Router();

// Get request to get all favourites stock data
router.get("/", getStockData);

// Get request to get specific stock data with set interval
router.get("/stockDataInterval", getStockDataWithInterval);

// Get request to get array of stocks by provided query
router.get("/findStock", findStockData);

// Post request to add new favourite stock
router.post("/addFavourite", addFavouriteStock);

// Delete request to remove new favourite stock
router.delete("/removeFavourite/:id", removeFavouriteStock);

// Post request to add new transaction data
router.post("/addTransaction", addStockTransaction);

module.exports = router;
