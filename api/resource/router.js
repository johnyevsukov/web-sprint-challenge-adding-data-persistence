// build your `/api/resources` router here
const express = require('express')
const Resource = require('./model')
const { checkResourcePayload } = require('./middleware')

const router = express.Router()


router.get('/', (req, res, next) => {
    Resource.getAll()
    .then(resources => {
        res.status(200).json(resources)
    })
    .catch(next)
})

router.post('/', checkResourcePayload, (req, res, next) => {
    Resource.create(req.body)
    .then(newResource => {
        res.status(201).json(newResource)
    })
    .catch(next)
})


module.exports = router