exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('digital_cert').del()
  await knex('digital_cert').insert([
    {
      company_id: 1,
      password: 'eyJhHGciOipIUztixt5o1',  //test
      digital_cert: 'Venta de carnes',
    },
  ]);
};
