/******************************************************************************
 * Title: session-api.js
 * Author: Clayton Stacy
 * Modified by:
 * Date: 10/22/2020
 * Description: API for managing user sessions
 *****************************************************************************/

 //imports
 const express = require('express');
 const User = require('../models/user');
 const bcrypt = require('bcryptjs');
 const ErrorResponse = require('../services/error-response');
 const BaseResponse = require('../services/base-response');

 // configure router
const router = express.Router();

//Signin Method
router.post('/signin', async(req, res) => {
  try {
    User.findOne({'userName': req.body.userName}, function(err, user) {
      if (err) {
        console.log(err);
        const signinMongoDbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
        res.status(500).send(signinMongoDbErrorResponse.toObject());
      } else {
        console.log(user);
        if (user) {
          let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
          if (passwordIsValid) {
            console.log('Login Successful');
            const signinResponse = new BaseResponse(200, 'Login Successful', user);
            res.json(signinResponse.toObject());
          } else {
            console.log(`Invalid userName: ${user.userName}`);
            const invalidUsernameErrorResponse = new ErrorResponse(500, 'Invalid userName and/or password.  Please try again', null);
            res.status(401).send(invalidUsernameErrorResponse.toObject());
          }
        }
      }
    })
  } catch (error) {
    console.log(error);
        const signinCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', error.message);
        res.status(500).send(signinCatchErrorResponse.toObject());
  }
});

module.exports = router;
