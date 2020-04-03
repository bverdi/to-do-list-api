const dbPgService = require('./access');

const getTodoById = async (id) => {
  const query = `
    SELECT * 
    FROM to_do 
    WHERE id = $1
  `;

  const values = [id];

  return dbPgService.executeQuery(query, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
  
};

const getAllTodos = async (offset, limit) => {

  const query = ` 
    SELECT *
    FROM to_do
    ORDER BY to_do.id
    LIMIT $1 OFFSET $2 
  `;

  const values = [limit, offset];
  return dbPgService.executeQuery(query, values);
};

const registerTodo = async ( todo) => {
  const query = ` 
    INSERT INTO to_do (description, completed, created_at, updated_at) 
    VALUES($1, $2, $3, $4) 
    RETURNING *;
  `;

  const values = [todo.description.toString(), todo.completed, todo.createdAt.toString(), todo.updatedAt.toString()];

  return dbPgService.executeQuery(query, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
};

const editToDo = async (todo) => {
  const query = ` 
    UPDATE to_do 
    SET description = $1, completed = $2, updated_at = $3
    WHERE to_do.id = $4 
  `;

  const values = [todo.description, todo.completed, todo.updatedAt.toString(), todo.id];
    
  return dbPgService.executeQuery(query, values)
    .then(result => {
      if (result.length > 0) {
        return result;
      }

      return null;
    });
};

const deleteToDo = async (id) => {
  const query = ` 
    DELETE FROM to_do 
    WHERE to_do.id = $1 
  `;

  const values = [id];
    
  return dbPgService.executeQuery(query, values)
    .then(result => {
      if (result.length > 0) {
        return result;
      }

      return null;
    });
};

module.exports = {
  getTodoById,
  getAllTodos,
  registerTodo,
  editToDo,
  deleteToDo
};