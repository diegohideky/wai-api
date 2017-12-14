/**
 * @author Diego Hideky
 */

'use strict';

var mongoose = require('mongoose')
  , db       = mongoose.createConnection('mongodb://localhost/wai');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.warn('DB connected');
});

module.exports.db = function () {
  return db;
};

module.exports.Schema = function () {
  return mongoose.Schema;
};