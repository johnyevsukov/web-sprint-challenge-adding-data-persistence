
exports.seed = function(knex) {
    return knex('tasks').del()
      .then(function () {
        return knex('tasks').insert([
          {task_description: 'open vscode', task_notes: 'dont mess up', project_id: '1'},
          {task_description: 'start making api', task_notes: 'still dont mess up', project_id: '1'},
          {task_description: 'open vscode', task_notes: 'dont mess up', project_id: '2'},
          {task_description: 'start making website', task_notes: 'still dont mess up', project_id: '2'}
        ]);
      });
  };