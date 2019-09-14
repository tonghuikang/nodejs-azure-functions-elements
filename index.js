const series = require("middleware-flow").series;

const middlewareModules = require("./modules/middleware/middlewareModules");

// In a usual Express App, the endpoints are defined at the root directory.
// These endpoints will have a series of middlewares bound to it.
// However, the Azure functions is defined in its respective folders.
// So these series of middlewares will be referenced from here.

// Instead of parsing a list of middleware to /api/serialisedMiddleware,
// we pass one middleware that was combined in series, using package middleware-flow
// This allows the to be deployed on Google Cloud Functions, if necessary.

exports.serialisedMiddleware = series(
  (req, res, next) => {
    console.log("===== START ENDPOINT /api/serialisedMiddleware =====");
    next();
  },
  middlewareModules.codestamp,
  (req, res, next) => {
    console.log("===== END ENDPOINT /api/serialisedMiddleware =====");
    next();
  },
  (req, res) => res.send(req.body)
);
