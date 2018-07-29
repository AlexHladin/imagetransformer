const express = require('express');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const User = require('../model/user');
const config = require('../../config');
const ApiError = require('../errors/ApiError');
const errors = require('../errors/errors');

const router = express.Router();
/**
 * @swagger
 * definition:
 *   user:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags:
 *       - auth
 *     description: Signin user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: Signin user
 *       400:
 *         description: User not exist
 */
router.post('/signin', (req, res, next) => {
  if (!req.body.hasOwnProperty('email') || !validator.isEmail(req.body.email) ||
    !req.body.hasOwnProperty('password') || !validator.isLength(req.body.password, { min: 3, max: 50 })) {
    return next(new ApiError(errors.INVALID_DATA));
  }

  User.find({ email: req.body.email }, (err, user) => {
    if (err) {
      return next(new ApiError(errors.INTERNAL_SERVER_ERROR));
    }

    if (user.length === 0 || !bcrypt.compareSync(req.body.password, user[0].password)) {
      return next(new ApiError(errors.USER_NOT_EXIST));
    }

    const authToken = jwt.sign({ id: user[0].id, email: user[0].email }, config.session.secret, { expiresIn: '30d' });
    res.json({ authToken });
  });
});

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - auth
 *     description: Signup user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: Signup user
 *       400:
 *         description: User already exist
 */
router.post('/signup', (req, res, next) => {
  if (!req.body.hasOwnProperty('email') || !validator.isEmail(req.body.email) ||
    !req.body.hasOwnProperty('password') || !validator.isLength(req.body.password, { min: 3, max: 50 })) {
    return next(new ApiError(errors.INVALID_DATA));
  }

  User.find({ email: req.body.email }, (err, user) => {
    if (user.length) {
      return next(new ApiError(errors.USER_ALREADY_EXIST));
    }

    const passwordHash = bcrypt.hashSync(req.body.password);
    const newUser = new User({
      email: req.body.email,
      password: passwordHash
    });

    newUser.save((error, savedUser) => {
      if (error) {
        return next(error);
      }

      const authToken = jwt.sign({ id: savedUser.id, email: savedUser.email }, config.session.secret, { expiresIn: '30d' });
      res.json({ authToken });
    });
  });
});

module.exports = router;
