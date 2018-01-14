/**
 * @fileoverview Description here
 * @author Diego Hideky de Oliveira Lima
 */

'use strict';

var conn   = require('./../connection/db_connect')
  , db     = conn.db()
  , Schema = conn.Schema();

module.exports = function () {
  var question = new Schema({
    title: String,
    alternatives: [
      {text: String, value: Number}
    ],
    answerType: String,
    subject: String,
    order: Number
  });

  return db.model('questions', question);
};
