/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd, Verlee Washington
Date: 20 Oct 2020
Description: APIs for BCRS Role
============================================
*/
const { FlexAlignStyleBuilder } = require('@angular/flex-layout');
const express = require('express');
const Role = require('../models/role');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const router = express.Router();


//findById
router.get('/:id', async(req, res) => {
  try {

   Role.findOne({'_id': req.params.id}, function(err,role){

    if (err) {
        console.log(err); //returns only db
        const findByIdMongoDbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
        res.status(500).send(findByIdMongoDbErrorResponse.toObject());
      } else {
        console.log(role);
        const findByIdResponse = new BaseResponse(200, 'Query Successful', role)
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
* FindAll - Finds all roles not marked disabled.
*/
router.get('/', async(req, res) => {
  try {

    Role.find({}).where('isEnabled').equals(true).exec(function(err, role) {

      if (err) {
        console.log(err);
        const MongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
        res.status(500).send(MongoDbErrorResponse.toObject())

      } else {
        console.log(role);
        const RoleResponse= new BaseResponse('200', 'Query Successful', role);
        res.json(RoleResponse.toObject());
      }
    })
  } catch (e) {
      const ErrorCatchResponse= new ErrorResponse('500', 'internal error', e.message);
      res.status(500).send(ErrorCatchResponse.toObject());
  }
})

/*
* CreateRole - Creates a new role.
*/
router.post('/', async(req, res) => {
  try {
     let sq = {
      text: req.body.text
     };

     Role.create(sq, function(err,createdRole){
       if (err) {
          console.log(err);
          const CreateRoleOnSaveMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
          res.status(500).send(CreateRoleOnSaveMongoDbErrorResponse.toObject());

       } else {
          console.log(createdRole);
          const CreateRoleResponse= new BaseResponse('200', 'Query Successful', createdRole);
          res.json(CreateRoleResponse.toObject());
       }
    }) //save end

  } catch (e) {
      console.log(e);
      const createRoleErrorCatchResponse= new ErrorResponse('500', 'internal error', e.message);
      res.status(500).send(createRoleErrorCatchResponse.toObject());
  }
})

/*
* UpdateRole - Updates a role.
*/
 router.put('/:id', async(req, res) => {

    try {
      Role.findOne({'_id': req.params.id}, function(err, role) {
        if (err) {
           console.log(err);
           const UpdateRoleMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
           res.status(500).send(UpdateRoleMongoDbErrorResponse.toObject());

        } else {
           console.log(role);
           role.set({
             text: req.body.text
           });

           role.save(function(err,updatedRole){
            if (err) {
              console.log(err);
              const UpdateRoleOnSaveMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
              res.status(500).send(UpdateRoleOnSaveMongoDbErrorResponse.toObject());

            } else {
               console.log(updatedRole);
               const UpdateRoleOnSaveResponse= new BaseResponse('200', 'Query Successful', updatedRole);
               res.json(UpdateRoleOnSaveResponse.toObject());
            }
          }) //end save

       }
      }) //end findOne
    } catch (e) {
      console.log(e);
      const updateRoleErrorCatchResponse= new ErrorResponse('500', 'internal error', e.message);
      res.status(500).send(updateRoleErrorCatchResponse.toObject());
    }
  })

/*
* DeleteRole - Delete a role which means setting isEnabled to false.
*/
router.delete('/:id', async(req, res) => {
   try {
          // find the role by document id
          Role.findOne({'_id': req.params.id}, function(err, role) {
            if (err) {
              console.log(err);
              const DeleteRoleMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
              res.status(500).send(DeleteRoleMongoDbErrorResponse.toObject());

            } else {
              console.log(role);

            if (role) {
              role.set({
                isEnabled: false
              });

              role.save(function(err,disableRole){
              if (err) {
                  console.log(err);
                  const DeleteRoleOnSaveMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
                  res.status(500).send(DeleteRoleOnSaveMongoDbErrorResponse.toObject());

              } else {
                  console.log(disableRole);
                  const DeleteRoleSuccessResponse= new BaseResponse('200', 'Disable role', disableRole);
                  res.json(DeleteRoleSuccessResponse.toObject());
              }
            }) //end save
          }
        }
      })

  } catch (e) {
       console.log(e);
       const deleteRoleErrorCatchResponse= new ErrorResponse('500', 'internal error', e.message);
      res.status(500).send(deleteRoleErrorCatchResponse.toObject());
    }
})

module.exports = router;
