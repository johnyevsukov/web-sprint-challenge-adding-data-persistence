// build your `Project` model here
const db = require('../../data/dbConfig')

const getAll = async () => {
    const projects = await db('projects')

    const restructuredProjects = projects.map(project => {
        return {
            ...project,
            project_completed: !!project.project_completed
        }
    })

    return restructuredProjects
}

const checkById = async (id) => {
    const project = await db('projects')
    .where('project_id', id)
    .first()

    return project
}

const getById = async (id) => {
    const project = await db('projects')
    .where('project_id', id)
    .first()

    const restructuredProject = {
        ...project,
        project_completed: !!project.project_completed
    }

    return restructuredProject
}

const create = async (project) => {
    const [id] = await db('projects')
    .insert(project)
    return getById(id)
}

module.exports = {
    getAll,
    create,
    getById,
    checkById
}