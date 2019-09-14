exports.echo = async function(req, res, next) {
    req.body["codestamp"] = "edited in middleware"
    next()
}