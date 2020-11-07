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
const { Error } = require('mongoose');

let router = express.Router();

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
        // Unwind 'deconstructs' arrays in a document.
        // For example, the following:
        // {"_id": 1, "item": "ABC1", sizes: ["S", "M", "L"] }
        // becomes:
        // {"_id": 1, "item": "ABC1", "sizes": "S" }
        // {"_id": 1, "item": "ABC1", "sizes": "M" }
        // {"_id": 1, "item": "ABC1", "sizes": "L" }
        '$unwind': '$lineItems'
      }, {

        // The group stage groups items by title. Price is included
        // so that value can be used by any function calling the api
        '$group': {
          '_id': {
            'title': '$lineItems.title',
            'price': '$lineItems.price'
          },
          'count': {
            // $sum: 1 applies the value 1 to each item that shares the
            // same title and sums. The result is the number of documents with
            // that title, in other words, the count.
            '$sum': 1
          }
        }
      }, {
        // Typical sort method applied to the results. 1 sorts ascending
        // and -1 sorts descending.
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
router.post('/:userName', async(req, res) => {
  try {
    const userName = req.params.userName; // pass over the fields of the request data
    // create new invoice
    const newInvoice = {
      userName,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total
    }

    console.log(newInvoice);

    Invoice.create(newInvoice, function(err, invoice) { // pass over invoice
      if (err) {
        console.log(err);
        const createInvoiceMongodbErrorResponse = new ErrorResponse("500", "Internal server error", err);
        res.status(500).send(createInvoiceMongodbErrorResponse.toObject());
      } else {
        console.log(invoice);
        const createInvoiceResponse = new BaseResponse("200", "Query successful", invoice);
        res.json(createInvoiceResponse.toObject());
      }
    })
  } catch (e) {
    console.log(e);
    const createInvoiceCatchErrorResponse = new ErrorResponse("500", "Internal server error", e.message);
    res.status(500).send(createInvoiceCatchErrorResponse.toObject());
  }
});



/*******************************************************************************
 * FindAllInvoices API
 * FindALl: /api/invoice/
 * This API will retrieve all invoices
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
