/******************************************************************************
 * Title: purchasable-service-api.js
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/27/2020
 * Description: purchasable service api
 *****************************************************************************/

"use strict";

const express = require('express');
const PurchasableService = require('../models/purchasable-service');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

let router = express.Router();

/*******************************************************************************
 * All of these functions work using "app.use('/api/purchasableService,
 * PurchasableServiceApi);" in the app.js file.
 * Example: router.get('/:serviceId') becomes
 * router.get('/api/purchasableService/:serviceId)
 ******************************************************************************/

/*******************************************************************************
 * Find all services
 ******************************************************************************/
router.get('/', async (req, res) => {

  try {
    PurchasableService.find({})
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
 * Find service by ID
 ******************************************************************************/
router.get('/:id', async (req, res) => {

  try {
    PurchasableService.findOne({
      '_id': req.params.id
    }, function (error, user) {

      if (error) {
        console.log(error);
        const errorResponse = new ErrorResponse("500",
          "find-service-by-id error", error);
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
 * Create service
 ******************************************************************************/
router.post('/', async (req, res) => {

  try {

    let aService = {
      price: req.body.price,
      text: req.body.text,
      isEnabled: true
    };

    PurchasableService.create(aService, function (err, service) {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse("500", "create-service error", err);
        res.status(500).send(errorResponse.toObject());
      } else {
        console.log(service);
        const successResponse = new BaseResponse("200", "success", service);
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
 * Update service
 ******************************************************************************/
router.put('/:id', async (req, res) => {

  try {
    PurchasableService.findOne({
        '_id': req.params.id
      },
      function (error, service) {

        if (error) {
          console.log(error);
          const errorResponse = new ErrorResponse("500",
            "update-service error", error);

          res.status(500).send(errorResponse.toObject());
        } else {
          console.log(service);

          service.set({
            price: req.body.price,
            text: req.body.text
          })

          service.save(function (err, updatedService) {
            if (err) {
              console.log(err);
              const errorResponse = new ErrorResponse("500",
                "Update-service-and-save error", error);

              res.status(500).send(errorResponse.toObject());
            } else {
              console.log(updatedService);
              const successResponse = new BaseResponse("200",
                "success", updatedService);
              res.json(successResponse.toObject());
            }
          })
        }
      })

  } catch (e) {
    console.log(e);
    const catchErrorResponse = new ErrorResponse("500",
      "Internal server error", e.message);
    res.status(500).send(catchErrorResponse.toObject());
  }
})

/*******************************************************************************
 * Delete service
 ******************************************************************************/
router.delete('/:id', async (req, res) => {

  try {
    PurchasableService.findOne({'_id': req.params.id}, function (err, service) {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse(500,
          'Internal Server Error', err);
        res.status(500).send(errorResponse.toObject());

      } else {
        console.log(service);
        service.set({
          isEnabled: false
        });

        service.save(function (error, updatedService) {
          if (error) {
            console.log(error);
            const errorResponse = new ErrorResponse(500,
              'Internal Server Error', error);
            res.status(500).send(errorResponse.toObject());
          } else {
            console.log(updatedService);
            const successResponse = new BaseResponse(200,
              'Delete Successful', updatedService);
            res.json(successResponse.toObject());
          }
        })
      }
    })
  } catch (e) {
    console.log(e);
    const catchErrorResponse = new ErrorResponse(500,
      'Internal Server Error', e.message);
    res.status(500).send(catchErrorResponse.toObject());
  }
})

module.exports = router;
