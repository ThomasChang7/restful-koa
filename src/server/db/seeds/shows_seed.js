exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shows')
    .del()
    .then(() => {
      return knex('shows').insert({
        name: 'Westworld',
        genre: 'Sci-fi',
        rating: 9,
        explicit: true
      });
    })
    .then(() => {
      return knex('shows').insert({
        name: 'Game of Thrones',
        genre: 'Fantasy',
        rating: 9,
        explicit: true
      });
    })
    .then(() => {
      return knex('shows').insert({
        name: 'Silicon Valley',
        genre: 'Comedy',
        rating: 9,
        explicit: true
      });
    });
};
