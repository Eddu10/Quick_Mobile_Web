
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('user').del()
      .then(() => knex('digital_cert').del())
      .then(() => knex('establishment').del())
      .then(() => knex('electronicDocument').del())
	  .then(() => knex('company').del())
};
