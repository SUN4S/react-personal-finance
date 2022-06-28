import express, { Request, Response } from "express";

import { ReportsModel } from "../models/reportsSchema";
import logger from "../config/winston";

export const weeklyReports = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    try {
      console.log(req.user);
      const reports = await ReportsModel.findOne({ userid: req.user.id });
      console.log(reports);
      logger.info(`${req.user.username} Requested Weekly Report`);
      return res.status(200).send(reports.weeklyReports);
    } catch (error) {
      logger.error(error.message);
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
};
