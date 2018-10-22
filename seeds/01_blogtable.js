
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('blogtable').del()
    .then(function () {
      // Inserts seed entries
      return knex('blogtable').insert([
        {
          id: 1,
          title: 'Week 1',
          content: 'I am so naive and full of hope...'
        },
        {
          id: 2,
          title: 'Week 4',
          content: 'Feeling a little stressed before Q1 projects...'
        },
        {
          id: 3,
          title: 'Week 6',
          content: 'Break week was awesome and I am feeling alive and ready to tackle Q2...'
        },
        {
          id: 4,
          title: 'Week 9',
          content: 'By week 9 my soul is CRUSHED...'
        },

      ])
    })
    .then(() => {
      // After SQL INSERT, update the autoincrementing id counter
      return knex.raw("SELECT setval('blogtable_id_seq', (SELECT MAX(id) FROM blogtable));")
    })
}
