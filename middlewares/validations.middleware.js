const { body } = require('express-validator')
const { validationResult } = require('express-validator')

const createUserValidations = [
  body('name')
    .notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty().withMessage('Email cannot be empty')
    .isEmail().withMessage('Must be a valid email'),
  body('password')
    .notEmpty().withMessage('Password cannot be empty')
    .isLength({ min: 8 }).withMessage('The minimal characters for the password is 8')
]

const createRepairValidations = [
  body('date')
    .notEmpty().withMessage('Date cannot be empty')
    .isDate().withMessage('This sentence is not a date format'),
  body('computerNumber')
    .notEmpty().withMessage('Computer number cannot be empty')
    .isLength({ min: 8 }).withMessage('The minimal characters for the computer number is 8'),
  body('comments')
    .notEmpty().withMessage('comments cannot be empty')
]

const checkValidations = (req, res, next) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    const errorMessages = errors.array().map(({msg}) => msg)
    const errorMessagesString = errorMessages.join('. ')
    return res.status(400).json({
      status: 'error',
      message: errorMessagesString
    })
  }
  next()
}

module.exports = {
  createUserValidations,
  createRepairValidations,
  checkValidations
}