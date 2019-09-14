const createHandler = require("azure-function-express").createHandler;
const app = require("express")();
const middlewareModules = require("../modules/middleware/middlewareModules");

// Here an endpoint is defined just like an Express app.
// The domain path defined has to be equal to the assigned domain path by Azure.
// The assigned domain path is /api/<folder name>
// Then the set of middleware can be defined as per usual.
// https://expressjs.com/en/guide/using-middleware.html

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
