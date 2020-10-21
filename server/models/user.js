/*
============================================
Title: BRCS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 19 Oct 2020
Description: Model for BRCS Users
============================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SecurityQuestion = require('./security-question');

let securityQuestion = new Schema({
  _id: { type: String },
  text: {type: String}
});

const userSchema = new Schema({
  username: {type: String, unique: true, dropDups: true },
  password: {type: String, required: true },
  firstName: {type: String },
  lastName: {type: String },
  phoneNumber: {type: String },
  altPhoneNumber: {type: String },
  addressStreet: {type: String },
  addressCity: {type: String },
  addressState: {type: String },
  addressZip: {type: String },
  email: {type: String},
  role: {type: String, default: 'standard'},
  isEnabled: {type: Boolean, default: false },
  securityQuestions: [securityQuestion],
  date_created: {type: Date, default: new Date()},
  date_modified: {type: Date}

}, { collection: 'user' });

module.exports = mongoose.model('User', userSchema);
