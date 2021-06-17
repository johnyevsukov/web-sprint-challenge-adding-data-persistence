const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

const projectA = { project_name: 'API', project_description: 'Build API' }
const projectB = { project_name: 'website', project_description: 'build website', project_completed: 1 }
const resourceA = { resource_name: 'mouse' }
const resourceB = { resource_name: 'computer', resource_description: 'Windows PC' }
const taskA = { task_description: 'do something', project_id: 1 }
const taskB = { task_description: 'do something else', task_notes: 'dont give up', project_id: 1 }

  beforeEach(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })

  afterAll(async () => {
    await db.destroy()
  })
  
  test('sanity', () => {
    expect(true).toBeTruthy()
  })

  describe('server.js', () => {
    describe('projects endpoints', () => {
      describe('GET /api/projects', () => {
        beforeEach(async () => {
          await db('projects').insert(projectA)
          await db('projects').insert(projectB)
        })
        test('can get all projects that exist in the table', async () => {
          const res = await request(server).get('/api/projects')
          expect(res.body).toHaveLength(2)
        }, 500)
        test('each project contains project_name, project_description and project_completed (as a boolean)', async () => {
          const res = await request(server).get('/api/projects')
          expect(res.body[0]).toMatchObject({ ...projectA, project_completed: false })
          expect(res.body[1]).toMatchObject({ ...projectB, project_completed: true })
        }, 500)
      })
      describe('POST /api/projects', () => {
        test('can add a new project to the table', async () => {
          await request(server).post('/api/projects').send(projectA)
          await request(server).post('/api/projects').send(projectB)
          const projects = await db('projects')
          expect(projects).toHaveLength(2)
          expect(projects[0]).toMatchObject(projectA)
          expect(projects[1]).toMatchObject({ project_name: 'website', project_description: 'build website' })
        }, 500)
        test('responds with the newly created project with its project_completed as a boolean', async () => {
          let res = await request(server).post('/api/projects').send(projectA)
          expect(res.body).toMatchObject({ ...projectA, project_completed: false })
          res = await request(server).post('/api/projects').send(projectB)
          expect(res.body).toMatchObject({ ...projectB, project_completed: true })
        }, 500)
        })

    describe('resources endpoints', () => {
        describe('GET /api/resources', () => {
        test('can get all resources in the table', async () => {
            await db('resources').insert(resourceA)
            await db('resources').insert(resourceB)
            const res = await request(server).get('/api/resources')
            expect(res.body).toHaveLength(2)
            expect(res.body[0]).toMatchObject(resourceA)
            expect(res.body[1]).toMatchObject(resourceB)
        }, 500)
        })
        describe('POST /api/resources', () => {
        test('can add a new resource to the table', async () => {
            await request(server).post('/api/resources').send(resourceA)
            await request(server).post('/api/resources').send(resourceB)
            const resources = await db('resources')
            expect(resources).toHaveLength(2)
            expect(resources[0]).toMatchObject(resourceA)
            expect(resources[1]).toMatchObject(resourceB)
        }, 500)
        })
    describe('tasks endpoints', () => {
        beforeEach(async () => {
        await db('projects').insert(projectA)
        await db('projects').insert(projectB)
        await db('tasks').insert(taskA)
        await db('tasks').insert(taskB)
        })
        describe('GET /api/tasks', () => {
        test('can get all tasks in the table', async () => {
            const res = await request(server).get('/api/tasks')
            expect(res.body).toHaveLength(2)
        }, 500)
        })
        })
    })
    })
  })