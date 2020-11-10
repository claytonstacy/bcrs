/******************************************************************************
 * Title: line-item.js
 * Author: Clayton Stacy
 * Modified by:
 * Date: 11/05/2020
 * Description: Line Item Schema
 *****************************************************************************/

 //imports
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 let lineItemSchema = new Schema({
  title: String,
  price: Number
 });

 module.exports = lineItemSchema;
