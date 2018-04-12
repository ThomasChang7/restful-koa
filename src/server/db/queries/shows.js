const knex = require('../connection');

function getAllShows() {
  return knex('shows').select('*');
}

function getSingleShow(id) {
  return knex('shows')
    .select('*')
    .where({
      id: parseInt(id)
    });
}

function addShow(show) {
  return knex('shows')
    .insert(show)
    .returning('*');
}

function updateShow(id, show) {
  return knex('shows')
    .update(show)
    .where({ id: parseInt(id) })
    .returning('*');
}

function deleteShow(id) {
  return knex('shows')
    .del()
    .where({ id: id })
    .returning('*');
}

module.exports = {
  getAllShows,
  getSingleShow,
  addShow,
  updateShow,
  deleteShow
};
