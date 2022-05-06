const express = require('express')
const { userExists } = require('../middlewares/users.middlewares')
const { 
  getAllUsers, 
  createUser, 
  getUserById, 
  updateUserById,
  deleteUser
} = require('../controllers/user.controllers')
const { createUserValidations, checkValidations } = require('../middlewares/validations.middleware')

const usersRouter = express.Router()

usersRouter
  .route('/')
  .get(getAllUsers)
  .post(createUserValidations, checkValidations, createUser)

usersRouter
  .use('/:id', userExists)
  .route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUser)

module.exports = { usersRouter }