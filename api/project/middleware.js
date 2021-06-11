const Project = require('./model')

const checkProjectId = (req, res, next) => {
    Project.checkById(req.body.project_id)
    .then(project => {
        if(!project) {
            next({
                message: 'no project by that id',
                status: 404
            })
        }
        else {
            next()
        }
    })
}

const checkProjectPayload = (req, res, next) => {
    const { project_name } = req.body

    if(project_name == undefined) {
        next({
            message: 'project name is required',
            status: 400
        })
    }
    else {
        next()
    }
}

module.exports = {
    checkProjectPayload,
    checkProjectId
}