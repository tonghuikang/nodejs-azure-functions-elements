const createHandler = require('azure-function-express').createHandler;
const app = require('express')()
var middlewareModules = require("../modules/middleware/middlewareModules")


// handles replacing placeholder @blah@
app.post('/api/basicMiddleware',
    (req, res, next) => {console.log('/api/basicMiddleware is called...'); next()},
    middlewareModules.echo,
    (req, res) => res.send(req.body)
) // done

// Binds the express app to an Azure Function handler
module.exports = createHandler(app)

