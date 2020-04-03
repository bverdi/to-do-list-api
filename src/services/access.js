const pg = require('pg');
const log = require('log');

const DB_TODO_HOST     = process.env.DB_TODO_HOST;
const DB_TODO_DATABASE = process.env.DB_TODO_DATABASE;
const DB_TODO_USER     = process.env.DB_TODO_USER;
const DB_TODO_PASSWORD = process.env.DB_TODO_PASSWORD;
const DB_TODO_PORT     = process.env.DB_TODO_PORT;

const poolToDo = new pg.Pool({
  database: DB_TODO_DATABASE,
  user: DB_TODO_USER,
  password: DB_TODO_PASSWORD,
  host: DB_TODO_HOST,
  port: DB_TODO_PORT,
  ssl:true
});

const executeQuery = (consulta, params = []) => {
  return poolToDo.connect()
    .then(client => {
      return client.query(consulta, params)
        .then(result => {
          client.release(true);
          return result.rows;
        })
        .catch(error => {
          client.release(true);
          log.error('executeQuery pm.db', error);
          return Promise.reject(error);
        });
    });
};

module.exports = {
  executeQuery
};