import { Request, Response } from "express";

import { ReportsModel } from "../models/reportsSchema";
import logger from "../config/winston";

// function to return weekly reports object array
// uses PassportJS session to authenticate user
export const weeklyReports = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }
  try {
    // mongoose query to get reports object data by userid
    const reports = await ReportsModel.findOne({ userid: req.user.id });
    logger.info(`${req.user.username} Requested Weekly Report`);
    // from received object, only return weekly reports
    return res.status(200).send(reports.weeklyReports);
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// function to return monthly reports object array
// uses PassportJS session to authenticate user
export const monthlyReports = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }
  try {
    // mongoose query to get reports object data by userid
    const reports = await ReportsModel.findOne({ userid: req.user.id });
    logger.info(`${req.user.username} Requested Weekly Report`);
    // from received object, only return monthly reports
    return res.status(200).send(reports.monthlyReports);
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};
