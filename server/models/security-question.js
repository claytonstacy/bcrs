/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd, Verlee Washington
Date: 19 Oct 2020
Description: Model for BCRS Security Questions
============================================
*/

const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let securityQuestionSchema = new Schema({
  text: {type: String},
  isEnabled: {type: Boolean, default: true }
}, {collection: 'securityQuestion'});

module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);
