import logger from "../config/winston";
import morgan from "morgan";

// middlware function to log incoming requests
export const morganRequestMiddleware = morgan(
  (tokens, req, res) => {
    // format json to be saved
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, "content-length"),
      response_time: Number.parseFloat(tokens["response-time"](req, res)),
    });
  },
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => {
        const data = JSON.parse(message);
        logger.http(`incoming-request`, data);
      },
    },
  }
);

// function to log outgoing responses
export const morganResponseMiddleware = morgan(
  (tokens, req, res) => {
    // format json to be saved
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      content_length: tokens.res(req, res, "content-length"),
    });
  },
  {
    immediate: true,
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => {
        const data = JSON.parse(message);
        logger.http(`outgoing-response`, data);
      },
    },
  }
);
