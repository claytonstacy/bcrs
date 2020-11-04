/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 19 Oct 2020
Description: Model for BCRS Role
============================================
*/

const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let roleSchema = new Schema({
  text: {type: String, unique: true, dropDups: true},
  isEnabled: {type: Boolean, default: true }
}, {collection: 'role'});

module.exports = mongoose.model('Role', roleSchema);
