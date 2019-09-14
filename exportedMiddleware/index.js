const createHandler = require('azure-function-express').createHandler;
const app = require('express')()
const index = require('../index')

/////////////////////////////////////////////
// Import SDK inside modules folder
/////////////////////////////////////////////

app.post('/api/exportedMiddleware',
    index.exportedMiddleware,
)

// Binds the express app to an Azure Function handler
module.exports = createHandler(app)