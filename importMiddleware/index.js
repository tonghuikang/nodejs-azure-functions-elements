const createHandler = require('azure-function-express').createHandler;
const app = require('express')()
const middlewareModules = require("../modules/middleware/middlewareModules")


// handles replacing placeholder @blah@
app.post('/api/importMiddleware',
    (req, res, next) => {console.log('/api/importMiddleware is called...'); next()},
    middlewareModules.echo,
    (req, res) => res.send(req.body)
) // done

// Binds the express app to an Azure Function handler
module.exports = createHandler(app)

