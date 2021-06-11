// build your `/api/tasks` router here
const express = require('express')
const Task = require('./model')
const { checkTaskPayload } = require('./middleware')
const { checkProjectId } = require('../project/middleware')

const router = express.Router()


router.get('/', (req, res, next) => {
    Task.getAll()
    .then(tasks => {
        res.status(200).json(tasks)
    })
    .catch(next)
})

router.post('/', checkTaskPayload, checkProjectId, (req, res, next) => {
    Task.create(req.body)
    .then(newTask => {
        res.status(201).json(newTask)
    })
    .catch(next)
})

module.exports = router