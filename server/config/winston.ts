import "winston-daily-rotate-file";

import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
import path from "path";
import winston from "winston";

const dotenv = require("dotenv");
dotenv.config();

const { combine, timestamp, colorize, align, printf, json } = winston.format;

// Connecting to logtail service
const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN);

// functions to filter out rogue data
const infoFilter = winston.format((info, opts) => {
  return info.level === "info" ? info : false;
});

const warnFilter = winston.format((info, opts) => {
  return info.level === "warn" ? info : false;
});

const errorFilter = winston.format((info, opts) => {
  return info.level === "error" ? info : false;
});

const httpFilter = winston.format((info, opts) => {
  return info.level === "http" ? info : false;
});

// Combined transport, saved all log data thats ever been provided
// excluding http requests
const fileRotateTransportCombined = new winston.transports.DailyRotateFile({
  filename: path.resolve(process.cwd() + "/logs/combined-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  format: winston.format.combine(timestamp({ format: "YYYY-MM-DD hh:mm:ss" }), json()),
});
fileRotateTransportCombined.on("rotate", (oldFilename, newFilename) => {
  console.log("You should probably save this somewhere");
});

// Warning transport, only saves logs with level of "warn"
const fileRotateTransportWarn = new winston.transports.DailyRotateFile({
  filename: path.resolve(process.cwd() + "/logs/app-warn-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  level: "warn",
  format: winston.format.combine(
    warnFilter(),
    timestamp({ format: "YYYY-MM-DD hh:mm:ss" }),
    json()
  ),
});
fileRotateTransportWarn.on("rotate", (oldFilename, newFilename) => {
  console.log("You should probably save this somewhere");
});

// Error transport, only saves logs with level of "error"
const fileRotateTransportError = new winston.transports.DailyRotateFile({
  filename: path.resolve(process.cwd() + "/logs/app-error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  level: "error",
  format: winston.format.combine(
    errorFilter(),
    timestamp({ format: "YYYY-MM-DD hh:mm:ss" }),
    json()
  ),
});
fileRotateTransportError.on("rotate", (oldFilename, newFilename) => {
  console.log("You should probably save this somewhere");
});

// Info transport, only saves logs with level of "info"
const fileRotateTransportInfo = new winston.transports.DailyRotateFile({
  filename: path.resolve(process.cwd() + "/logs/app-info-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  level: "info",
  format: winston.format.combine(
    infoFilter(),
    timestamp({ format: "YYYY-MM-DD hh:mm:ss" }),
    json()
  ),
});
fileRotateTransportInfo.on("rotate", (oldFilename, newFilename) => {
  console.log("You should probably save this somewhere");
});

// Http transport, only saves logs with level of "http"
const fileRotateTransportHttp = new winston.transports.DailyRotateFile({
  filename: path.resolve(process.cwd() + "/logs/http-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  level: "http",
  format: winston.format.combine(
    httpFilter(),
    timestamp({ format: "YYYY-MM-DD hh:mm:ss" }),
    json()
  ),
});
fileRotateTransportInfo.on("rotate", (oldFilename, newFilename) => {
  console.log("You should probably save this somewhere");
});

// Creating winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  exitOnError: false,
  transports: [
    // Along side saving all logs to respective files, they're also shown in the console
    // excluding http requests
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
    fileRotateTransportHttp,
    new LogtailTransport(logtail),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.resolve(process.cwd() + "/logs/exception.log") }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: path.resolve(process.cwd() + "/logs/rejections.log") }),
  ],
});

export default logger;
