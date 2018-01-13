/**
 * @fileoverview Description here
 * @author Diego Hideky de Oliveira Lima
 */

'use strict';

var conn   = require('./../connection/db_connect')
  , db     = conn.db()
  , Schema = conn.Schema();

module.exports = function () {
  var school = new Schema({
    name: String,
    address: String,
    number: Number,
    complement: String,
    postalCode: Number,
    city: String,
    state: String,
    country: String,
    lat: Number,
    lng: Number
  });

  return db.model('schools', school);
};
