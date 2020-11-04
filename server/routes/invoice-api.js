/******************************************************************************
 * Title: invoice-api.js
 * Author: Verlee Washington, Jeff Shepherd
 * Modified by:
 * Date: 11/3/2020
 * Description: invoice api
 *****************************************************************************/

"use strict";

const express = require('express');
const Product = require('../models/product');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

let router = express.Router();

/*******************************************************************************
 * Find purchases by product API
 *
 * FindPurchasesByService: /api/invoices/purchases-graph
 * This API will return an aggregate collection of all purchases by service
 * Hint: use MongoDB's built-in 'unwind, group, count, and sort' aggregate
 * functions to build an array of objects with the service name and purchase
 * count totals
 * Hint: review the format primeNG is expecting for the graph's data source
 ******************************************************************************/

router.get('/purchases-graph', async (req, res) => {

  try {
    Product.findOne({
      '_id': req.params.id
    }, function (error, document) {

      if (error) {
        console.log(error);
        const errorResponse = new ErrorResponse("500",
          "find-product-by-id error", error);
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
 * Create invoice API
 * CreateInvoice: /api/invoices/:username
 * This API will create a new invoice document by username
 ******************************************************************************/
