const createHandler = require("azure-function-express").createHandler;
const app = require("express")();
const index = require("../index");

// You can defined the list of middleware elsewhere.
// The Express allows you to pass an array of middlewares.
// https://stackoverflow.com/questions/31928417#comment76228651_36649698

app.post("/api/serialisedMiddleware", index.serialisedMiddleware);

// Binds the express app to an Azure Function handler
module.exports = createHandler(app);
