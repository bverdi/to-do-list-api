
'use strict';

//
// dependencies

const registerController = require('./persist.controller');
const retrieveController = require('./retrieve.controller');

const getTodosByIdRoute = async(event) => {
  return await retrieveController.getTodoById(event);
};

const getAllTodosRoute = async (event) => {
  return await retrieveController.getAllTodos(event);
};

const registerTodosRoute = async (event) => {
  return await registerController.registerToDo(event);
};

const editTodosRoute = async (event) => {
  return await registerController.editToDo(event);
};

const deleteTodosRoute = async (event) => {
  return await registerController.deleteToDo(event);
};

module.exports = {
  getTodosByIdRoute,
  getAllTodosRoute,
  registerTodosRoute,
  editTodosRoute,
  deleteTodosRoute
};