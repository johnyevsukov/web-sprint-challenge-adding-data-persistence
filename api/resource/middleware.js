const Project = require('./model')

const checkResourcePayload = (req, res, next) => {
    const { resource_name } = req.body

    if(resource_name == undefined) {
        next({
            message: 'resource name is required',
            status: 400
        })
    }
    else {
        next()
    }
}

module.exports = {
    checkResourcePayload
}