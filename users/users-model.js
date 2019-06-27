const db = require('../data/dbConfig.js');

module.exports = {
  add,
  update,
  remove,
  find,
  findBy,
  findById,
};

function find() {
  return db('users').select('id', 'username');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .select('id', 'username')
    .where({ id })
    .first();
};

async function update(id, changes)   {
  const [id] = await db('users').update(changes)

  return findById(id)
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}