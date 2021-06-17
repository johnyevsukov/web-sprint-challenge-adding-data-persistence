const Project = require('./model')

const checkTaskPayload = (req, res, next) => {
    const { task_description, project_id } = req.body

    if(task_description == undefined || project_id == undefined) {
        next({
            message: 'task_description and project are required',
            status: 400
        })
    }
    else {
        next()
    }
}

module.exports = {
    checkTaskPayload
}