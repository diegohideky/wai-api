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
<<<<<<< HEAD
    idh: Number,
    students: Number,
    postalCode: Number,
    address: String,
    number: Number,
    complement: String,
    neighborhood: String,
=======
    address: String,
    number: Number,
    complement: String,
    postalCode: Number,
>>>>>>> 5df5f01e975a8336f015b507e212eabaeadb99dc
    city: String,
    state: String,
    country: String,
    lat: Number,
    lng: Number
  });

  return db.model('schools', school);
};
