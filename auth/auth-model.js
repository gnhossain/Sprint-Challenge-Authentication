const db = require('../database/dbConfig.js');

module.exports = {
    add,
    findBy
};

function add(user){
    return db('users').insert(user, 'id')
}

function findBy(user){
    return db('user')
    .where(user)
    .first();
}