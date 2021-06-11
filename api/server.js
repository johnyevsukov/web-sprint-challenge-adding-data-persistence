// build your server here and require it from index.js
const express = require('express');

const ResourceRouter = require('./resource/router');
const ProjectRouter = require('./project/router');
const TaskRouter = require('./task/router');

const server = express();

server.use(express.json());
server.use('/api/resources', ResourceRouter);
server.use('/api/projects', ProjectRouter);
server.use('/api/tasks', TaskRouter);

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      custom: 'something went wrong in the api',
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = server;
