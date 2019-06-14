const knex = require("knex");
const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

module.exports = db;


// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//      filename: "./mydb.sqlite"
//   },
//   useNullAsDefault: true
// });
