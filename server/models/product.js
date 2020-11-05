/******************************************************************************
 * Title: product.js
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/27/2020
 * Description: model for purchasable services
 *****************************************************************************/
"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  price: Number,
  title: {type: String, lowercase: true, trim: true},
  isEnabled: {type: Boolean, default: true}
}, { collection: 'service' });

module.exports = mongoose.model('Product', productSchema);
