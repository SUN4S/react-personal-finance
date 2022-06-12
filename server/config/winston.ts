import "winston-daily-rotate-file";

import path from "path";
import winston from "winston";

const { combine, timestamp, colorize, align, printf, json } = winston.format;

const errorFilter = winston.format((info, opts) => {
  return info.level === "error" ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === "info" ? info : false;
});

const warnFilter = winston.format((info, opts) => {
  return info.level === "warn" ? info : false;
});

const fileRotateTransportCombined = new winston.transports.DailyRotateFile({
  filename: path.resolve(process.cwd() + "/logs/combined-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  format: winston.format.combine(timestamp(), json()),
});
fileRotateTransportCombined.on("rotate", (oldFilename, newFilename) => {
  console.log("You should probably save this somewhere");
});

const fileRotateTransportWarn = new winston.transports.DailyRotateFile({
  filename: path.resolve(process.cwd() + "/logs/app-warn-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  level: "warn",
  format: winston.format.combine(warnFilter(), timestamp(), json()),
});
fileRotateTransportWarn.on("rotate", (oldFilename, newFilename) => {
  console.log("You should probably save this somewhere");
});

const fileRotateTransportError = new winston.transports.DailyRotateFile({
  filename: path.resolve(process.cwd() + "/logs/app-error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  level: "error",
  format: winston.format.combine(errorFilter(), timestamp(), json()),
});
fileRotateTransportError.on("rotate", (oldFilename, newFilename) => {
  console.log("You should probably save this somewhere");
});

const fileRotateTransportInfo = new winston.transports.DailyRotateFile({
  filename: path.resolve(process.cwd() + "/logs/app-info-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  level: "info",
  format: winston.format.combine(infoFilter(), timestamp(), json()),
});
fileRotateTransportInfo.on("rotate", (oldFilename, newFilename) => {
  console.log("You should probably save this somewhere");
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: "YYYY-MM-DD hh:mm:ss" }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
    }),
    fileRotateTransportCombined,
    fileRotateTransportInfo,
    fileRotateTransportWarn,
    fileRotateTransportError,
  ],
});

logger.info("Info message");
logger.error("Error message");
logger.warn("Warning message");

export default logger;
