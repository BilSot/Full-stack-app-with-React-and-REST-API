const express = require('express');
const bcryptjs = require('bcryptjs');
const {check, validationResult, body} = require('express-validator');
const {User} = require('../models/index');
const authenticateUser = require('./authenticateUser');
const asyncHandler = require('./asyncHandler');
const router = express.Router();

const neededFields = [
    check('firstName')
        .exists({checkNull: true, checkFalsy: true})
        .withMessage('Please provide a value for "First Name"'),
    check('lastName')
        .exists({checkNull: true, checkFalsy: true})
        .withMessage('Please provide a value for "Last Name"'),
    check('emailAddress')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide valid "emailAddress"')
        .exists({checkNull: true, checkFalsy: true})
        .withMessage('Please provide a value for "Email Address"'),
    check('password')
        .exists({checkNull: true, checkFalsy: true})
        .withMessage('Please provide a value for "Password"'),
];

const checkEmailAddressDuplicate =
    body('email').custom((value, {req}) => {
        return User.findOne({
            where: {
                emailAddress: req.body.emailAddress
            }
        }).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    });

const checkPasswordMatch =
    body('confirmPass').custom((value, { req }) => {
        if (value !== req.body.password) {
            return Promise.reject('Passwords don\'t match');
        }else{
            return true;
        }
    });

/*
GET the currently authenticated user
 */
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    const users = await User.findByPk(user.id, {
        attributes: ['id', 'firstName', 'lastName', 'emailAddress']
    });
    res.status(200).json(users);
}));

/*
POST for new user creation. Checks for all the required fields and for e-mail address duplication
 */
router.post('/users', neededFields, checkEmailAddressDuplicate, checkPasswordMatch,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg);
                return res.status(400).json({errors: errorMessages});
            }

            const {confirmPass, ...user} = await req.body;
            user.password = bcryptjs.hashSync(user.password);
            await User.create(user);
            return res.location("/").status(201).end();
        } catch (error) {
            if (error === 'SequelizeUniqueConstraintError') {
                res.status(500).json('The credentials you entered are already in use').end();
            } else {
                res.status(500).json('There was a problem with your request')
            }
        }

    });

module.exports = router;
