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
const bodyParser = require('body-parser');
//const BaseResponse = require('../services/base-response');
//const ErrorResponse = require('../services/error-response');

let router = express.Router();

/*******************************************************************************
 * All of these functions work using "app.use('/api/users, UserApi);" in the
 * app.js file. Example: router.get('/:userId') becomes
 * router.get('/api/users/:userId)
 ******************************************************************************/

/*******************************************************************************
 * Find all users
 ******************************************************************************/
router.get('', async (req, res) => {

  try {
    User.find({}),
      function (error, users) {
        if (error) {
          console.log(error);
          // const errorResponse = new errorResponse(error);
          // res.status(500).send(errorResponse.toObject());
        } else {
          console.log(users);
          // const successResponse = new BaseResponse(users);
          // res.json(successResponse.toObject());
          res.json(users);
        }
      }
  } catch (e) {
    console.log(e);
    // res.status(500).send(new ErrorResponse(e.message).toObject());
    res.status(500).send(e.message);
  }
});

/*******************************************************************************
 * Find user by ID
 ******************************************************************************/
router.get('/:userId', async (req, res) => {

  try {
    User.findOne({
      'userId': req.params.userId
    }, function (error, user) {

      if (error) {
        console.log(error);
        // const errorResponse = new ErrorResponse(error);
        // res.status(500).send(errorResponse.toObject());
      } else {
        console.log(user);
        // const successResponse = new BaseResponse(user);
        // res.json(successResponse.toObject());
        res.json(user);
      }
    })
  } catch (e) {
    console.log(e);
    // res.status(500).send(new ErrorResponse(e.message).toObject());
    res.status(500).send(e.message);
  }
});

/*******************************************************************************
 * Create user
 ******************************************************************************/
router.post('/', async (req, res) => {

  try {
    aUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      altPhoneNumber: req.body.phoneNumber,
      addressStreet: req.body.addressStreet,
      addressCity: req.body.addressCity,
      addressZip: req.body.addressZip,
      // I'm not sure if the ternary operator will work inside the constructor
      // invocation, but we'll find out
      role: (req.body.role ? req.body.role : 'standard'),
      isEnabled: (req.body.isEnabled ? req.body.role : true),
      securityQuestions: req.body.securityQuestions
    })

    aUser.save(function (err) {
      if (err) {
        console.log(err);
        // const errorResponse = new ErrorResponse(err);
        // res.status(500).send(errorResponse.toObject());
      } else {
        console.log(user);
        // const successResponse = new BaseResponse(user);
        // res.json(successResponse.toObject());
        res.json(user);
      }
    })

  } catch (e) {
    console.log(e);
    // const catchErrorResponse = new catchErrorResponse(e.message);
    // res.status(500).send(catchErrorResponse.toObject());
    res.status(500).send(e.message);
  }
})

/*******************************************************************************
 * Update user
 * We have several options for this including findOne() + save(), which is
 * the option I chose below. It may be worth considering other options.
 * Other options are updateOne(), findOneAndUpdate(), and findByIdAndUpdate()
 ******************************************************************************/
router.put('/:username', async (req, res) => {

  try {
    User.findOne({
        'username': req.params.username
      },
      function (error, user) {

        if (error) {
          console.log(error);
          // const errorResponse = new ErrorResponse(error);
          // res.status(500).send(errorResponse.toObject());
        } else {
          // iterate over the keys of the object so multiple items
          // can be changed.
          const keys = Object.keys(req.body.user);
          keys.forEach((key) => {
            user.set({
              key: req.body.user['key']
            })
          });
        }
      })

  } catch (e) {
    console.log(e);
    // const catchErrorResponse = new catchErrorResponse(e.message);
    // res.status(500).send(catchErrorResponse.toObject());
    res.status(500).send(e.message);
  }
})

/*******************************************************************************
 * Delete user
 ******************************************************************************/
router.delete('/:username', async (req, res) => {

  try {

  } catch (e) {

  }
})

module.exports = router;
