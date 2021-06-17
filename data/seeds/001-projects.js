
exports.seed = function(knex) {
    return knex('projects').del()
      .then(function () {
        return knex('projects').insert([
          {project_name: 'Build API', project_description: 'build out a working api'},
          {project_name: 'Build Website', project_description: 'build out a working website'},
        ]);
      });
  };