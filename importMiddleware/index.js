const createHandler = require('azure-function-express').createHandler;
const app = require('express')()
var localImports = require("../modules/local-imports.js")

/////////////////////////////////////////////
// Import SDK inside modules folder
/////////////////////////////////////////////

// handles replacing placeholder @blah@
app.post('/api/basicMiddleware',
    (req, res, next) => {console.log('/api/basicMiddleware is called...'); next()},
    localImports.echo,
    (req, res) => res.send(req.body)
) // done

// Binds the express app to an Azure Function handler
module.exports = createHandler(app)