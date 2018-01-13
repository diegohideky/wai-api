/**
 * @fileoverview Description here
 * @author Diego Hideky de Oliveira Lima
 */

'use strict';

var conn   = require('./../connection/db_connect')
  , db     = conn.db()
  , Schema = conn.Schema();

module.exports = function () {
  var collaborator = new Schema({
    name: String,
    college: String,
    years: Number,
    campus: String
  });

  return db.model('collaborators', collaborator);
};
