/******************************************************************************
 * Title: product-api.js
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/27/2020
 * Description: product api
 *****************************************************************************/

"use strict";

const express = require('express');
const Product = require('../models/product');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

let router = express.Router();

/*******************************************************************************
 * All of these functions work using "app.use('/api/purchasable,
 * PurchasableApi);" in the app.js file.
 * Example: router.get('/:purchasableId') becomes
 * router.get('/api/purchasable/:purchasableId)
 ******************************************************************************/

/*******************************************************************************
 * Find all products
 ******************************************************************************/
router.get('/', async (req, res) => {

  try {
    Product.find({})
      .where('isEnabled')
      .equals(true)
      .exec(function (error, services) {
        if (error) {
          console.log(error);
          const errorResponse = new ErrorResponse("500", "error", error);
          res.status(500).send(errorResponse.toObject());
        } else {
          console.log(services);
          const successResponse = new BaseResponse("200",
            "successful find all", services);
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
 * Find product by ID
 ******************************************************************************/
router.get('/:id', async (req, res) => {

  try {
    Product.findOne({
      '_id': req.params.id
    }, function (error, document) {

      if (error) {
        console.log(error);
        const errorResponse = new ErrorResponse("500",
          "find-service-by-id error", error);
        res.status(500).send(errorResponse.toObject());
      } else {
        console.log(document);
        const successResponse = new BaseResponse("200", "success", document);
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
 * Create product
 ******************************************************************************/
router.post('/', async (req, res) => {

  try {

    let aProduct = {
      price: req.body.price,
      text: req.body.text,
      isEnabled: true
    };

    Purchasable.create(aProduct, function (err, product) {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse("500", "create-service error", err);
        res.status(500).send(errorResponse.toObject());
      } else {
        console.log(product);
        const successResponse = new BaseResponse("200", "success", product);
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
 * Update product
 ******************************************************************************/
router.put('/:id', async (req, res) => {

  try {
    Product.findOne({
        '_id': req.params.id
      },
      function (error, product) {

        if (error) {
          console.log(error);
          const errorResponse = new ErrorResponse("500",
            "update-service error", error);

          res.status(500).send(errorResponse.toObject());
        } else {
          console.log(product);

          product.set({
            price: req.body.price,
            text: req.body.text
          })

          product.save(function (err, updatedProduct) {
            if (err) {
              console.log(err);
              const errorResponse = new ErrorResponse("500",
                "Update-service-and-save error", error);

              res.status(500).send(errorResponse.toObject());
            } else {
              console.log(updatedProduct);
              const successResponse = new BaseResponse("200",
                "success", updatedProduct);
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
 * Delete product
 ******************************************************************************/
router.delete('/:id', async (req, res) => {

  try {
    Product.findOne({'_id': req.params.id}, function (err, product) {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse(500,
          'Internal Server Error', err);
        res.status(500).send(errorResponse.toObject());

      } else {
        console.log(product);
        product.set({
          isEnabled: false
        });

        service.save(function (error, updatedProduct) {
          if (error) {
            console.log(error);
            const errorResponse = new ErrorResponse(500,
              'Internal Server Error', error);
            res.status(500).send(errorResponse.toObject());
          } else {
            console.log(updatedProduct);
            const successResponse = new BaseResponse(200,
              'Delete Successful', updatedProduct);
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
