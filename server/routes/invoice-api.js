/******************************************************************************
 * Title: invoice-api.js
 * Author: Verlee Washington, Jeff Shepherd
 * Modified by:
 * Date: 11/3/2020
 * Description: invoice api
 *****************************************************************************/

"use strict";

const express = require('express');
const Invoice = require('../models/invoice');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

let router = express.Router();

/*******************************************************************************
 * Find purchases by product API
 *
 * FindPurchasesByProduct: /api/invoices/purchases-graph
 * This API will return an aggregate collection of all purchases by product
 * Hint: use MongoDB's built-in 'unwind, group, count, and sort' aggregate
 * functions to build an array of objects with the product name and purchase
 * count totals
 * Hint: review the format primeNG is expecting for the graph's data source
 ******************************************************************************/

// db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])
// { "_id" : "tutorials point", "num_tutorial" : 2 }
// { "_id" : "Neo4j", "num_tutorial" : 1 }


router.get('/purchases-graph', async (req, res) => {

  Invoice.aggregate([
    {$match: {}}, //match all, find all
    {$project: {
      _id: 0,
      items: 1 // instruction to return items. 1 is true, 0 would be false
    }}
  ])

  try {
    // First match the desired field
    let productsCountArray = await Invoice.aggregate([
      { $match: { items: {} } }, //this line says to match all items
      {
        // second group instances of product names
        $group: {
          //here is where you would specify the name of the product
          text: 'password reset',
          // third count the number of each product
          count: { $sum: 1}
        }
      }
    ])

    console.log(productsCountArray);
    /*
      items array should look like this:
      [
        [{"price": 99.99, "text": "password reset", "isEnabled": true}, {}],
        [{}, {}],
        [{}, {}]
      ]
    */



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
