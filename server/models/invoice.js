/*
============================================
Title: BRCS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd, Verlee Washington
Date: 5 November 2020
Description: Model for BRCS Invoices
============================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LineItemSchema = require('../schemas/line-item');


const invoiceSchema = new Schema({ // invoice collection
  userName: String,
  lineItems: [LineItemSchema], // array of line items
  partsAmount: Number,
  laborAmount: Number,
  lineItemTotal: Number,
  total: Number,
  orderDate: {type: Date, default: new Date()}

}, { collection: 'invoice' });

module.exports = mongoose.model('Invoice', invoiceSchema);
