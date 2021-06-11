// build your `/api/projects` router here
const express = require('express')
const Project = require('./model')
const { checkProjectPayload } = require('./middleware')

const router = express.Router()


router.get('/', (req, res, next) => {
    Project.getAll()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(next)
})

router.post('/', checkProjectPayload, (req, res, next) => {
    Project.create(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(next)
})

module.exports = router