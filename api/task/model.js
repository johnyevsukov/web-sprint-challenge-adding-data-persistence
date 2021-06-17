// build your `Task` model here
const db = require('../../data/dbConfig')

// SQL query

// SELECT 
// t.task_id,
// t.task_description, 
// t.task_notes, 
// t.task_completed, 
// p.project_name, 
// p.project_description 
// FROM tasks as t JOIN projects as p 
// ON t.project_id = p.project_id;

const getAll = async () => {
    const tasks = await db('tasks as t')
    .select(
        't.task_id',
        't.task_description',
        't.task_notes', 
        't.task_completed', 
        'p.project_name', 
        'p.project_description')
    .join('projects as p', 't.project_id', 'p.project_id')

    const restructuredTasks = tasks.map(task => {
        return {
            ...task,
            task_completed: !!task.task_completed
        }
    })

    return restructuredTasks
}

const getById = async (id) => {
    const task = await db('tasks')
    .where('task_id', id)
    .first()

    const restructuredtask = {
        ...task,
        task_completed: !!task.task_completed
    }

    return restructuredtask
}

const create = async (task) => {
    const [id] = await db('tasks')
    .insert(task)
    return getById(id)
}

module.exports = {
    getAll,
    create
}