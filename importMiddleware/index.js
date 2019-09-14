const createHandler = require("azure-function-express").createHandler;
const app = require("express")();
const middlewareModules = require("../modules/middleware/middlewareModules");

app.post(
  "/api/importMiddleware",
  (req, res, next) => {
    console.log("/api/importMiddleware is called...");
    next();
  },
  middlewareModules.codestamp,
  (req, res) => res.send(req.body)
);

// "Binds the express app to an Azure Function handler"
module.exports = createHandler(app);
