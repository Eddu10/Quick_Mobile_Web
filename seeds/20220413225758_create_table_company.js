exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('company').del()
  await knex('company').insert([
      {
          id: 1,
          id_number: '134',
          company_name: 'Test',  //test
          trade_name:'Venta de carnes',
          address: 'Latacunga',
          email: 'test@example.com',
          description: 'Test company'
      },
      {
        id: 2,
        id_number: '1345',
        company_name: 'Fenix',  //test
        trade_name:'Venta de pollos',
        address: 'Latacunga',
        email: 'test@example.com',
        description: 'Test company'
    },
  ]);
};