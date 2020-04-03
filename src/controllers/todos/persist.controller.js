
'use strict';



//
// dependencies
const todoListService = require('../../services/todos.service');
const validator = require('../../utils/validator');
const responseHelper = require('../../helpers/response.error.helper');

const _validateRegisterToDoBody = (body) => {
  const registerSchema = {
    'id': '/RegisterChallengeKingBD',
    'type': 'object',
    'properties': {
      'description': { 'type': 'string' },
      'completed': { 'type': 'boolean' }
    },
    'required': ['description', 'completed']
  };
  return validator.validateBody(registerSchema, body);
};

const _validateEditToDoBody = (body) => {
  const editSchema = {
    'id': '/EditChallengeKingBD',
    'type': 'object',
    'properties': {
      'description': { 'type': 'string' },
      'completed': { 'type': 'boolean' }
    },
    'required': ['description', 'completed']
  };
  return validator.validateBody(editSchema, body);
};

const registerToDo = async (event) => {
  const postBody = _validateRegisterToDoBody(event.body);

  const todo = {
    description: postBody.description,
    completed: postBody.completed,
    createdAt: new Date(Date.now()).toLocaleString(),
    updatedAt: new Date(Date.now()).toLocaleString()
  };

  try {
    const todoRegistered = await todoListService.registerTodo(todo);
    // eslint-disable-next-line no-undef
    console.info('TODO registered into TODO List');
    return responseHelper.returnSucess(todoRegistered, 201);
  }
  catch (err) {
    if (err.constraint == 'to_do_un') {
      return responseHelper.returnError('challengeKing-400-already-exists', 201);
    }
    else {
      return responseHelper.returnError('challengeKing-400-bad-request', 400);
    }
  }
};

const editToDo = async (event) => {
  const postBody = _validateEditToDoBody(event.body);

  const id = event.pathParameters.id;
  const description = postBody.description;
  const completed = postBody.completed;
  const updatedAt = new Date(Date.now()).toLocaleString();

  const todo = await todoListService.getTodoById(id);
  if (!todo) {
    return responseHelper.returnError('challengeKing-404-not-found', 404);
  }

  todo.description = description;
  todo.completed = completed;
  todo.updatedAt = updatedAt;

  try {
    await todoListService.editToDo(todo);
  } catch (err) {
    if (err.constraint == 'to_do_fk0') {
      return responseHelper.returnError('challengeKing-400-invalid-parameters', 400);
    } else {
      return responseHelper.returnError('challengeKing-400-bad-request', 400);
    }
  }
  // eslint-disable-next-line no-undef
  console.info('TODO successfully edited!');
  return responseHelper.returnSucess(todo, 200);
};

const deleteToDo = async (event) => {
  const id = event.pathParameters.id;

  const todo = await todoListService.getTodoById(id);

  if (!todo) {
    return responseHelper.returnError('challengeKing-404-not-found', 404);
  }
  
  await todoListService.deleteToDo(id);
  return responseHelper.returnSucess(id, 200);
};

module.exports = {
  registerToDo,
  editToDo,
  deleteToDo
};