exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('user').del()
    await knex('user').insert([
        {
            id: 1,
            username: 'jos',
            password: '$2b$10$VnN.arr20V.P27V..eIMzuA.vslvZuvCQ4ZWJ/NCqPhaSUVG9Ok5i',  //test
            email: 'prueba@test.com',
            group: 'admin',
        },
    ]);
};
  