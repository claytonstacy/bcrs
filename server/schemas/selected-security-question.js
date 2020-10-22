/******************************************************************************
 * Title: selected-security-question.js
 * Author: Clayton Stacy
 * Modified by:
 * Date: 10/22/2020
 * Description: Schema for user roles
 *****************************************************************************/

 //imports
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 let selectedSecurityQuestionSchema = new Schema({
   questionText: {type: String },
   answerText: {type: String }
 });

 module.exports = selectedSecurityQuestionSchema;
