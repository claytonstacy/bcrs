/******************************************************************************
 * Title: user-api.js
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/20/2020
 * Description: user api
 *****************************************************************************/

"use strict";

const User = require('../models/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const { restart } = require('nodemon');

let router = express.Router();
const saltRounds = 10;

/*******************************************************************************
 * All of these functions work using "app.use('/api/users, UserApi);" in the
 * app.js file. Example: router.get('/:userId') becomes
 * router.get('/api/users/:userId)
 ******************************************************************************/

/*******************************************************************************
 * Find all users
 ******************************************************************************/
router.get('/', async (req, res) => {

  try {
    User.find({})
      .where('isEnabled')
      .equals(true)
      .exec(function (error, users) {
        if (error) {
          console.log(error);
          const errorResponse = new ErrorResponse("500", "error", error);
          res.status(500).send(errorResponse.toObject());
        } else {
          console.log(users);
          const successResponse = new BaseResponse("200",
            "successful find all", users);
          res.json(successResponse.toObject());
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send(new ErrorResponse("500",
      "Internal server error", e.message).toObject());
  }
});

/*******************************************************************************
 * Find user by ID
 ******************************************************************************/
router.get('/:id', async (req, res) => {

  try {
    User.findOne({
      '_id': req.params.id
    }, function (error, user) {

      if (error) {
        console.log(error);
        const errorResponse = new ErrorResponse("500",
          "find-user-by-id error", error);
        res.status(500).send(errorResponse.toObject());
      } else {
        console.log(user);
        const successResponse = new BaseResponse("200", "success", user);
        res.json(successResponse.toObject());
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send(new ErrorResponse("500",
      "Internal server error", e.message).toObject());
  }
});

/*******************************************************************************
 * Create user
 ******************************************************************************/
router.post('/', async (req, res) => {

  try {
    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    let aUser = {
      userName: req.body.userName,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
    };

    User.create(aUser, function (err, user) {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse("500", "create-user error", err);
        res.status(500).send(errorResponse.toObject());
      } else {
        console.log(user);
        const successResponse = new BaseResponse("200", "success", user);
        res.json(successResponse.toObject());
      }
    })

  } catch (e) {
    console.log(e);
    const catchErrorResponse = new ErrorResponse("500",
      'Internal server error', e.message);
    res.status(500).send(catchErrorResponse.toObject());
  }
})

/*******************************************************************************
 * Update user
 * All five fields in the set method must be included. Otherwise, the related
 * field will become undefined after this is executed.
 ******************************************************************************/
router.put('/:id', async (req, res) => {

  try {
    User.findOne({
        '_id': req.params.id
      },
      function (error, user) {

        if (error) {
          console.log(error);
          const errorResponse = new ErrorResponse("500",
            "update-user error", error);

          res.status(500).send(errorResponse.toObject());
        } else {
            console.log(user);

            user.set({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              phoneNumber: req.body.phoneNumber,
              address: req.body.address,
              email: req.body.email
            })

          user.save(function (err, updatedUser) {
            if (err) {
              console.log(err);
              const errorResponse = new ErrorResponse("500",
                "Update-user-and-save error", error);

              res.status(500).send(errorResponse.toObject());
            } else {
              console.log(updatedUser);
              const successResponse = new BaseResponse("200",
                "success", updatedUser);
              res.json(successResponse.toObject());
            }
          })
        }
      })

  } catch (e) {
    console.log(e);
    const catchErrorResponse = new ErrorResponse("500", e.message, e);
    res.status(500).send(catchErrorResponse.toObject());
  }
})

/*******************************************************************************
 * Delete user
 ******************************************************************************/
router.delete('/:id', async (req, res) => {

  try {
      User.findOne({'_id': req.params.id}, function(err, user) {
        if (err) {
          console.log(err);
          const deleteUserErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
          res.status(500).send(deleteUserErrorResponse.toObject());
        } else {
          console.log(user);
          user.set({
            isEnabled: false
          });
          user.save(function(error, savedUser) {
            if (error) {
              console.log(error);
              const deleteUserErrorResponse = new ErrorResponse(500, 'Internal Server Error', error);
              res.status(500).send(deleteUserErrorResponse.toObject());
            } else {
              console.log(savedUser);
              const savedDeleteUserResponse = new BaseResponse(200, 'Delete Successful', savedUser);
              res.json(savedDeleteUserResponse.toObject());
            }
          })
        }
      })
  } catch (e) {
    console.log(e);
    const deleteUserCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
    res.status(500).send(deleteUserCatchErrorResponse.toObject());
  }
})

module.exports = router;
