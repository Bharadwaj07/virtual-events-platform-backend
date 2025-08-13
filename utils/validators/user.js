const {body} = require('express-validator');


const validateCreateUser =[
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({min: 3})
        .withMessage('Name must be at least 3 characters long'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),
    body('role')
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['ORGANIZER', 'ATTENDEE'])
        .withMessage('Role must be either ORGANIZER or ATTENDEE')
]

const validateLoginUser = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),
]
module.exports = {
    validateCreateUser,
    validateLoginUser
}