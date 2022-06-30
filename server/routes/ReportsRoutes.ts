import { monthlyReports, weeklyReports } from "../controllers/ReportsController";

import express from "express";

const router = express.Router();

router.get("/weeklyReports", weeklyReports);
router.get("/monthlyReports", monthlyReports);

module.exports = router;
