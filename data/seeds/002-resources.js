
exports.seed = function(knex) {
    return knex('resources').del()
      .then(function () {
        return knex('resources').insert([
          {resource_name: 'google', resource_description: 'search engine'},
          {resource_name: 'canvas', resource_description: 'learning tool / website'},
        ]);
      });
  };