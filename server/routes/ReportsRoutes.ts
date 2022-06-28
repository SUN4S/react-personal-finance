import express, { Request, Response } from "express";

import { ReportsModel } from "../models/reportsSchema";
import { generateWeeklyReport } from "../cron/cronjob";
import logger from "../config/winston";
import { weeklyReports } from "../controllers/ReportsController";

const router = express.Router();

router.get("/weeklyReports", weeklyReports);

router.get("/forceReports", (req: Request, res: Response) => {
  generateWeeklyReport();
});

module.exports = router;
