/******************************************************************************
 * Title: invoice-api.js
 * Author: Verlee Washington, Jeff Shepherd
 * Modified by:
 * Date: 11/3/2020
 * Description: invoice api
 *****************************************************************************/

"use strict";

const express = require('express');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const Invoice = require('../models/invoice');
/* const LineItemSchema = require('../schemas/line-item'); */

let router = express.Router();

// temporary schema and model
const mongoose = require('mongoose');

/*******************************************************************************
 * Find purchases by product API
 *
 * FindPurchasesByProduct: /api/invoice/purchases-graph
 * This API will return an aggregate collection of all purchases by product
 * Hint: review the format primeNG is expecting for the graph's data source
 ******************************************************************************/
router.get('/purchases-graph', async (req, res) => {

  try {
    Invoice.aggregate([
      {
        '$unwind': '$lineItems'
      }, {
        '$group': {
          '_id': {
            'title': '$lineItems.title',
            'price': '$lineItems.price'
          },
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          '_id.title': 1
        }
      }
    ], function (err, purchaseGraph) {
      if (err) {
        console.log(err);
        const errorResponse = new ErrorResponse('500',
          'Internal server error', err);
        res.status(500).send(errorResponse.toObject());
      } else {
        console.log(purchaseGraph);
        const successResponse = new BaseResponse('200',
          'Query successful', purchaseGraph);
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
 * CreateInvoice: /api/invoice/:username
 * This API will create a new invoice document by username
 ******************************************************************************/


/******************************************************************************/




/*******************************************************************************
 * FindAllInvoices API
 * FindALl: /api/invoice/
 * This API will retreive all invoices
 ******************************************************************************/
router.get('/', async (req, res) => {

  try {
    Invoice.find({})
      .exec(function (error, invoices) {
        if (error) {
          console.log(error);
          const findAllErrorResponse = new ErrorResponse("500", "error", error);
          res.status(500).send(findAllErrorResponse.toObject());
        } else {
          console.log(invoices);
          const findAllSuccessResponse = new BaseResponse("200",
            "Found all invoices", invoices);
          res.json(findAllSuccessResponse.toObject());
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send(new ErrorResponse("500",
      "Internal server error", e.message).toObject());
  }
});

/******************************************************************************/
module.exports = router;
