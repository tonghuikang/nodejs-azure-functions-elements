const series = require('middleware-flow').series;

const middlewareModules = require('./modules/middleware/middlewareModules')

exports.serialisedMiddleware = series(
    (req, res, next) => { console.log('===== START ENDPOINT /api/serialisedMiddleware ====='); next() },
    middlewareModules.echo,
    (req, res, next) => { console.log('===== END ENDPOINT /api/serialisedMiddleware ====='); next() },
    (req, res) => res.send(req.body)
)