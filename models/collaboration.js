/**
 * @fileoverview Description here
 * @author Diego Hideky de Oliveira Lima
 */

'use strict';

var conn   = require('./../connection/db_connect')
  , db     = conn.db()
  , Schema = conn.Schema();

module.exports = function () {
  var collaboration = new Schema({
    collaborator: String,
    answers: [
      {question: String, text: String, value: Number}
    ]
  });

  return db.model('collaborations', collaboration);
};
