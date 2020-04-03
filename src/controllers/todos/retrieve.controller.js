
'use strict';

//
// dependencies
const todoListService = require('../../services/todos.service');
const responseHelper = require('../../helpers/response.error.helper');


const getTodoById = async (event) => {
  const id = event.pathParameters.id;
  try {
    const todo = await todoListService.getTodoById(id);
    if(!todo){
      return responseHelper.returnError('challengeKing-404-not-found', 404);
    }
    return responseHelper.returnSucess(todo, 200);
  }
  catch (err) {
    return responseHelper.returnError('challengeKing-500-bad-request', 500);
  }
};

const getAllTodos = async (event) => {
  if(!event.queryStringParameters)
    event.queryStringParameters = {};

  let   offset = event.queryStringParameters.offset || 0;
  let   limit  = event.queryStringParameters.limit  || 20;

  offset = parseInt(offset);
  limit  = parseInt(limit);

  if (offset < 0 || limit < 0){
    return responseHelper.returnError('challengeKing-400-invalid-parameters', 400);
  }
  
  const todoList = await todoListService.getAllTodos(offset, limit + 1);

  let nextPage = false;
  if (todoList.length > limit){
    nextPage = true;
    todoList.pop();
  }

  const returnBody = {
    todos  : todoList,
    nextPage : nextPage
  };
  return responseHelper.returnSucess(returnBody, 200);

};


module.exports = {
  getTodoById,
  getAllTodos
};