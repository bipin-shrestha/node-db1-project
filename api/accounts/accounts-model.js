const db = require('../../data/db-config.js');

const getAll = () => {
  // DO YOUR MAGIC
  console.log(db('accounts'));
  return db('accounts');
}

const getById = id => {
  // DO YOUR MAGIC
return db.from('accounts').where({ id });
}

const create = async account => {
  // DO YOUR MAGIC
  return db('accounts').insert(account);
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  return db('accounts').update(account).where({ id });
}

const deleteById = async id => {
  // DO YOUR MAGIC
  return db('accounts').del().where({ id });
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
