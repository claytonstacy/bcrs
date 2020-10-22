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
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

let router = express.Router();

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
    User.find({},
      function (error, users) {
        if (error) {
          console.log(error);
          const errorResponse = new ErrorResponse("500",
            "find-all-users error", error);
          res.status(500).send(errorResponse.toObject());
        } else {
          console.log(users);
          const successResponse = new BaseResponse("200", "success", users);
          res.json(successResponse.toObject());
        }
      })
  } catch (e) {
    console.log(e);
    res.status(500).send(new ErrorResponse("500", e.message, e).toObject());
  }
});

/*******************************************************************************
 * Find user by ID
 ******************************************************************************/
router.get('/:userId', async (req, res) => {

  try {
    User.findOne({
      '_id': req.params.userId
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
    res.status(500).send(new ErrorResponse("500", e.message, e).toObject());
  }
});

/*******************************************************************************
 * Create user
 ******************************************************************************/
router.post('/', async (req, res) => {

  try {

    let aUser = new User({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      altPhoneNumber: req.body.altPhoneNumber,
      addressStreet: req.body.addressStreet,
      addressCity: req.body.addressCity,
      addressZip: req.body.addressZip,
      email: req.body.email,
      role: req.body.role,
      isEnabled: req.body.isEnabled,
      securityQuestions: req.body.securityQuestions,
      date_created: req.body.date_created,
      date_modified: req.body.date_modified
    });

    aUser.save(function (err) {
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
    const catchErrorResponse = new catchErrorResponse("500", e.message, e);
    res.status(500).send(catchErrorResponse.toObject());
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
          const errorResponse = new ErrorResponse("500",
            "update-user error", error);

          res.status(500).send(errorResponse.toObject());
        } else {
          // iterate over the keys of the object so multiple items
          // can be changed.
          const keys = Object.keys(req.body.user);
          keys.forEach((key) => {
            user.set({
              key: req.body.user['key']
            })
          });

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
    const catchErrorResponse = new catchErrorResponse("500", e.message, e);
    res.status(500).send(catchErrorResponse.toObject());
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
