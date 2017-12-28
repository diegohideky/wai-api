/**
 * @fileoverview Description here
 * @author Diego Hideky de Oliveira Lima
 */

'use strict';

var conn   = require('./../connection/db_connect')
  , db     = conn.db()
  , Schema = conn.Schema();

module.exports = function () {
  var user = new Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    active: Boolean
    // dateOfBirth: Date
    // address: {
    //   number: Number,
    //   street: String,
    //   complement: String,
    //   cep: Number,
    //   city: String,
    //   state: String
    // }
  });

  return db.model('users', user);
};
