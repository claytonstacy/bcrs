/******************************************************************************
 * Title: purchasable-service-item.js
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/27/2020
 * Description: Schema for service items to be used with the invoice
 *****************************************************************************/

"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let purchasableServiceItem = new Schema({
  text: String,
  price: Number
});

module.exports = purchasableServiceItem;
