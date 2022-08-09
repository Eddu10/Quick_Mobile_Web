exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('electronic_document').del()
  await knex('electronic_document').insert([
      {
        company_id: 1,
        doc_number: '0987654321',
        access_key: 'yegdgwuyew742b',
        auth_number: '0987543421',
        xml_content: 'qew5fey',
        state: 'activo',
        auth_date: '2022-04-20',
        last_attempt_date: '2022-04-20',
        attempt_number: 5,
        issue_date: '2022-04-20',
        xml_auth: 'g53gs6'
      },  
  ]);
};