/**
 * @fileoverview Description here
 * @author Diego Hideky de Oliveira Lima
 */

'use strict';

var conn   = require('./../connection/db_connect')
  , db     = conn.db()
  , Schema = conn.Schema();

module.exports = function (app) {
  var user = new Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    active: Boolean
  });

  return db.model('users', user);
};
