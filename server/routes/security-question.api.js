/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 20 Oct 2020
Description: APIs for BCRS Security Questions
============================================
*/
const { FlexAlignStyleBuilder } = require('@angular/flex-layout');
const express = require('express');
const SecurityQuestion = require('../models/security-question');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const router = express.Router();


//findById
router.get('/:id', async(req, res) => {
  try {

   SecurityQuestion.findOne({'_id': req.params.id}, function(err,securityQuestion){

    if (err) {
        console.log(err); //returns only db
        const findByIdMongoDbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
        res.status(500).send(findByIdMongoDbErrorResponse.toObject());
      } else {
        console.log(securityQuestion);
        const findByIdResponse = new BaseResponse(200, 'Query Successful', securityQuestion)
        res.json(findByIdResponse.toObject());
      }
   })

  } catch (e) {
    console.log(e);
    const findByIdCathErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
    res.status(500).send(findByIdCathErrorResponse.toObject());
  }

  })

/*
* FindAll - Finds all security questions not marked disabled.
*/
router.get('/', async(req, res) => {
  try {

    SecurityQuestion.find({}).where('isEnabled').equals(true).exec(function(err, securityQuestion) {

      if (err) {
        console.log(err);
        const MongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
        res.status(500).send(MongoDbErrorResponse.toObject())

      } else {
        console.log(securityQuestion);
        const SecurityQuestionResponse= new BaseResponse('200', 'Query Successful', securityQuestion);
        res.json(SecurityQuestionResponse.toObject());
      }
    })
  } catch (e) {
      const ErrorCatchResponse= new ErrorResponse('500', 'internal error', e.message);
      res.status(500).send(ErrorCatchResponse.toObject());
  }
})

/*
* CreateSecurityQuestion - Creates a new security question.
*/
router.post('/', async(req, res) => {
  try {
     let sq = {
      text: req.body.text
     };

     SecurityQuestion.create(sq, function(err,updatedSecurityQuestion){
       if (err) {
          console.log(err);
          const CreateSecurityQuestionOnSaveMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
          res.status(500).send(CreateSecurityQuestionOnSaveMongoDbErrorResponse.toObject());

       } else {
          console.log(updatedSecurityQuestion);
          const CreateSecurityQuestionResponse= new BaseResponse('200', 'Query Successful', updatedSecurityQuestion);
          res.json(CreateSecurityQuestionResponse.toObject());
       }
    }) //save end

  } catch (e) {
      console.log(e);
      const createSecurityQuestionErrorCatchResponse= new ErrorResponse('500', 'internal error', e.message);
      res.status(500).send(createSecurityQuestionErrorCatchResponse.toObject());

  }
})

/*
* UpdateSecurityQuestion - Updates a security question.
*/
 router.put('/:id', async(req, res) => {

    try {
      SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
        if (err) {
           console.log(err);
           const UpdateSecurityQuestionMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
           res.status(500).send(UpdateSecurityQuestionMongoDbErrorResponse.toObject());

        } else {
           console.log(securityQuestion);
           securityQuestion.set({
             text: req.body.text
           });

           securityQuestion.save(function(err,updatedSecurityQuestion){
            if (err) {
              console.log(err);
              const UpdateSecurityQuestionOnSaveMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
              res.status(500).send(UpdateSecurityQuestionOnSaveMongoDbErrorResponse.toObject());

            } else {
               console.log(updatedSecurityQuestion);
               const UpdateSecurityQuestionOnSaveResponse= new BaseResponse('200', 'Query Successful', updatedSecurityQuestion);
               res.json(UpdateSecurityQuestionOnSaveResponse.toObject());

            }
          }) //end save

       }
      }) //end findOne
    } catch (e) {
      console.log(e);
      const updateSecurityQuestionErrorCatchResponse= new ErrorResponse('500', 'internal error', e.message);
      res.status(500).send(updateSecurityQuestionErrorCatchResponse.toObject());

    }
  })

/*
* DeleteSecurityQuestion - Delete a security question which means setting isEnabled to false.
*/
router.delete('/:id', async(req, res) => {
   try {
          SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
            if (err) {
              console.log(err);
              const DeleteSecurityQuestionMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
              res.status(500).send(DeleteSecurityQuestionMongoDbErrorResponse.toObject());

            } else {
              console.log(securityQuestion);

          if (securityQuestion) {
              securityQuestion.set({
                isEnabled: false
              });

              securityQuestion.save(function(err,disableSecurityQuestion){
              if (err) {
                  console.log(err);
                  const DeleteSecurityQuestionOnSaveMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
                  res.status(500).send(DeleteSecurityQuestionOnSaveMongoDbErrorResponse.toObject());

              } else {
                  console.log(disableSecurityQuestion);
                  const DeleteSecurityQuestionSuccessResponse= new BaseResponse('200', 'Disable security question', disableSecurityQuestion);
                  res.json(DeleteSecurityQuestionSuccessResponse.toObject());

              }
              }) //end save

          }
        }
      })

  } catch (e) {
       console.log(e);
       const deleteSecurityQuestionErrorCatchResponse= new ErrorResponse('500', 'internal error', e.message);
      res.status(500).send(deleteSecurityQuestionErrorCatchResponse.toObject());

    }
})

/*
* FindSecurityQuestionsByIds - Lookup security questions by security question Ids.
*/

router.post('/find-by-ids', function (req, res, next) {
  const question1 = req.body.question1;
  const question2 = req.body.question2;
  const question3 = req.body.question3;

  SecurityQuestion.find({

  //passing-in three security question Ids
    $or: [
      {'_id': question1},
      {'_id': question2},
      {'_id': question3}
    ]
  }).exec(function (err, securityQuestions) {
    if (err) {
      console.log(err);
      return next(err); //return to function
    } else {
      console.log(securityQuestions);
      res.json(securityQuestions);
    }
  })
 });


module.exports = router;
