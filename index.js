const series = require('middleware-flow').series;

const middlewareModules = require('./modules/middleware/middlewareModules')

exports.exportedMiddleware = series(
    (req, res, next) => { console.log('===== START ENDPOINT /api/exportedMiddleware ====='); next() },
    middlewareModules.echo,
    (req, res, next) => { console.log('===== END ENDPOINT /api/exportedMiddleware ====='); next() },
    (req, res) => res.send(req.body)
)