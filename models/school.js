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
    idh: Number,
    students: Number,
    postalCode: Number,
    address: String,
    number: Number,
    complement: String,
    neighborhood: String,
    city: String,
    state: String,
    country: String,
    lat: Number,
    lng: Number,
    attributes: [
      {name: String, score: Number, count: Number}
    ]
  });

  return db.model('schools', school);
};
