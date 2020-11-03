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
const { verify } = require('crypto');
const { config } = require('karma');

 // configure router
const router = express.Router();
const saltRounds = 10;

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
          if (passwordIsValid && user.isEnabled) {
            console.log('Login Successful');
            const signinResponse = new BaseResponse(200, 'Login Successful', user);
            res.json(signinResponse.toObject());
          } else {
            console.log(`Invalid userName: ${user.userName}`);
            const invalidUsernameErrorResponse = new ErrorResponse(500, 'Invalid username and/or password.  Please try again', null);
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

//Register User API goes here
/*******************************************************************************
 * Register
 ******************************************************************************/
router.post('/register', async (req, res) => {
  try {
    User.findOne({'userName': req.body.userName}, function(err, user) {
      if (err) {
        console.log(err);
        const registerUserMongodbErrorResponse = new ErrorResponse("500", "register-user error", err);
        res.status(500).send(registerUserMongodbErrorResponse.toObject());
      } else {
        if (!user) {
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
          standardRole = {
            role: 'standard'
          }

          // user object
          let aUser = {
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            role: standardRole,
            securityQuestions: req.body.selectedSecurityQuestions
          };
          console.log('This is what is sent', JSON.stringify(aUser));
          User.create(aUser, function (err, user) {
            if (err) {
              console.log(err);
              const errorResponse = new ErrorResponse("500", "create-user error", err);
              res.status(500).send(errorResponse.toObject());
            } else {
              console.log('This is what was received', JSON.stringify(user));
              const successResponse = new BaseResponse("200", "success", user);
              res.json(successResponse.toObject());
            }
          })
        } else {
          console.log('This user name already exist.');
          const userExistErrorResponse = new ErrorResponse("500", "user-exist error", null);
          res.status(500).send(userExistErrorResponse.toObject());
        }
      }
    })
  } catch (e) {
    console.log(e);
    const catchErrorResponse = new ErrorResponse("500",
      'Internal server error', e.message);
    res.status(500).send(catchErrorResponse.toObject());
  }
});

//Verify User API goes here
router.get('/verify/users/:userName', async (req, res) => {
  try {
    User.findOne({'userName': req.params.userName}, function(err, user) {
      if (user) {
        console.log(user);
        const verifyUserResponse = new BaseResponse("200", "success", user);
        res.json(verifyUserResponse.toObject());
      } else {
        console.log(err);
        const verifyUserMongodbErrorResponse = new ErrorResponse("500", "verification-user error", err);
        res.status(500).send(verifyUserMongodbErrorResponse.toObject());
      }
    })
  } catch (e) {
    console.log(e);
    const verifyUserCatchErrorResponse = new ErrorResponse("500", "verification-user error", e.message);
    res.status(500).send(verifyUserCatchErrorResponse.toObject());
  }
});


//Verify Security Question API

/*
  Verify Security question API is expecting a body with securityQuetion property, the property should be an array as follows:
  {
	"securityQuestions": [
	{"questionText": "What is your favorite candy and ice cream for a blizzard?", "answerText": "Answer1"},
	{"questionText": "What is your favorite animal?", "answerText": "Answer2"},
	{"questionText": "What street did you grow up on?", "answerText": "Answer3"}
	]
}
*/
router.post('/verify/users/:username/security-questions', function (req, res) {
  console.log('These are the answers', req.body)
  const answerToSecurityQuestion1 = req.body.answerText1.trim(); // post answer question 1
  const answerToSecurityQuestion2 = req.body.answerText2.trim(); // post answer question 2
  const answerToSecurityQuestion3 = req.body.answerText3.trim(); // post answer question 3

  User.findOne({'userName': req.params.username}, function (err, user) {
    if (err) {
      console.log(err);
    } else {

	    let answer1IsValid = answerToSecurityQuestion1 === user.securityQuestions[0].answerText.trim(); //  valid answer question 1
      let answer2IsValid = answerToSecurityQuestion2 === user.securityQuestions[1].answerText.trim(); //  valid answer question 2
      let answer3IsValid = answerToSecurityQuestion3 === user.securityQuestions[2].answerText.trim(); //  valid answer question 3
      if (answer1IsValid && answer2IsValid && answer3IsValid) { // ensure answers are valid

          res.status(200).send({
          message: 'success', // success
          auth: true
        })
      } else {

        res.status(200).send({
          message: 'error', // error
          auth: false
        })
      }
    }
  })
});


/*
router.post('/verify/users/:userName/security-questions', async(req, res) => {
  try {
    User.findOne({'userName': req.params.userName}, function(err, user) {  //Find the user object in the DB first
      if (err) {
        console.log(err);
        const verifySecurityQuestionsMongoDbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
        res.status(500).send(verifySecurityQuestionsMongoDbErrorResponse.toObject());
      } else {  //Check the answers in this else block
          let matched = true;
          let i = 0;
          //Iterate through the supplied responses, find the corresponding DB answers and see if the answers match, if one doesn't exit immediately and set matched to false
           while (i < req.body.securityQuestions.length && matched === true) {
            matched = req.body.securityQuestions[i].answerText === user.securityQuestions.find(q => q.questionText === req.body.securityQuestions[i].questionText).answerText;
            i++
          }
          //If all the answers passed, then send a success message
          if (matched === true) {
            console.log('Good responses', user)
            const verifySecurityQuestionResponse = new BaseResponse(200, 'User Found', user);
            res.json(verifySecurityQuestionResponse.toObject());
          } else { //If an answer failed then send a fail response
            console.log('Bad responses')
            const verifySecurityQuestionsMatchErrorResponse = new ErrorResponse(500, 'Answers do not match', null);
            res.status(500).send(verifySecurityQuestionsMatchErrorResponse.toObject());
          }
        }
    });
  } catch (error) {

  }
});
*/
//Reset Password API
/* The Reset API needs a body with a password property
*/

router.post('/users/:userName/reset-password',async(req, res) => {
  //hash the password before sending
  let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

  try {
    User.findOne({ //Find the user in the database
        'userName': req.params.userName
      },
      function (error, user) {

        if (error) {
          console.log(error);
          const findUserErrorResponse = new ErrorResponse("500",
            "Update-password error", error);

          res.status(500).send(findUserErrorResponse.toObject());
        } else { //Once found, update the password property and save it
            console.log(user);

            user.set({
              password: hashedPassword
            })

          user.save(function (err, updatedUser) {
            if (err) {
              console.log(err);
              const savePasswordErrorResponse = new ErrorResponse("500",
                "There was a problem saving your password", error);

              res.status(500).send(savePasswordErrorResponse.toObject());
            } else {
              console.log(updatedUser);
              const savePasswordSuccessResponse = new BaseResponse("200",
                "New Password Saved", updatedUser);
              res.json(savePasswordSuccessResponse.toObject());
            }
          });
        }
      });

  } catch (e) {
    console.log(e);
    const catchErrorResponse = new ErrorResponse("500",
      "Internal server error", e.message);
    res.status(500).send(catchErrorResponse.toObject());
  }
})

module.exports = router;
