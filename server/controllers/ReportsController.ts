import express, { Request, Response } from "express";

import { ReportsModel } from "../models/reportsSchema";
import logger from "../config/winston";

export const weeklyReports = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    try {
      const reports = await ReportsModel.findOne({ userid: req.user.id });
      logger.info(`${req.user.username} Requested Weekly Report`);
      return res.status(200).send(reports.weeklyReports);
    } catch (error) {
      logger.error(error.message);
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
};

export const monthlyReports = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    try {
      const reports = await ReportsModel.findOne({ userid: req.user.id });
      logger.info(`${req.user.username} Requested Weekly Report`);
      return res.status(200).send(reports.monthlyReports);
    } catch (error) {
      logger.error(error.message);
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
};
