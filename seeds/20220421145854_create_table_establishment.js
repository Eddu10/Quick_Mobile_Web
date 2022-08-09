exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('establishment').del()
  await knex('establishment').insert([
      {
        number: '112',
        address: 'Ambato',
        company_id: 1,
        company_name: 'ADS',
        state: 'activo'
      },  
  ]);
};