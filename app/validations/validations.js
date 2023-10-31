const { check } = require('express-validator');

const userValidation = [
  check('email').isEmail().normalizeEmail().withMessage('Invalid Email!'),
  check('password', 'Password must match the required criteria!')
    .isLength({ min: 8})
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d[\]{};:=<>_+^#$@!%*?&]{8,30}$/, 'i')
];
const passwordValidation = [
  check('newPassword', 'Password must match the required criteria!')
    .isLength({ min: 8, max: 20 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d[\]{};:=<>_+^#$@!%*?&]{8,30}$/, 'i'),
];
const personalInfovalidation = [
  check('Email').isEmail().normalizeEmail().withMessage('Invalid Email!'),
  check('FirstName', "FirstName doesn't exists").exists({ checkFalsy: true }),
  check('LastName', "LastName doesn't exists").exists({ checkFalsy: true }),
  check('Address', 'Address is required').exists({ checkFalsy: true }),
 
];
module.exports = {
  userValidation,
  passwordValidation,
  personalInfovalidation,
};
