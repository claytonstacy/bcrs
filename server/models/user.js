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
const SelectedSecurityQuestionSchema = require('../schemas/selected-security-question');
const UserRoleSchema = require('../schemas/user-role');


const userSchema = new Schema({
  userName: {type: String, unique: true, dropDups: true },
  password: {type: String, required: true },
  firstName: {type: String },
  lastName: {type: String },
  phoneNumber: {type: String },
  address: {type: String },
  email: {type: String},
  role: UserRoleSchema,
  isEnabled: {type: Boolean, default: true },
  securityQuestions: [SelectedSecurityQuestionSchema],
  date_created: {type: Date, default: new Date()},
  date_modified: {type: Date}

}, { collection: 'user' });

module.exports = mongoose.model('User', userSchema);
