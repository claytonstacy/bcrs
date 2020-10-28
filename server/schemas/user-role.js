/******************************************************************************
 * Title: user-role.js
 * Author: Clayton Stacy
 * Modified by:
 * Date: 10/22/2020
 * Description: Schema for user roles
 *****************************************************************************/

 //imports
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 let userRoleSchema = new Schema({
   role: {type: String, default: 'standard'}
 });

 module.exports = userRoleSchema;
