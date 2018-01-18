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
    school: String,
    datetime: Date,
    answers: [
      { 
        question: {
          title: String,
          alternatives: [
            { text: String, value: Number }
          ],
          attributes: [
            { name: String }
          ],
          answerType: String,
          subject: String,
          order: Number
        },
        choises: [
          {
            text: String,
            value: Number,
            complement: String
          }
        ],
        typed: String
      }
    ]
  });

  return db.model('collaborations', collaboration);
};
