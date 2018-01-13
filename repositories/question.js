/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */
/**
 * @fileoverview Description here
 * @author Diego Hideky de Oliveira Lima
 */

'use strict';

var assert = require('../utils/assert');

module.exports = function (app) {
  var Question = app.models.question;

  return {
    findQuestions: function (callback) {
      assert.execQuery(Question.find({}), function (promise) {
        promise.then(callback);
      });
    },
    findQuestion: function (query, callback) {
      assert.execQuery(Question.findOne(query), function (promise) {
        promise.then(callback);
      });
    },
    findQuestionById: function (id, callback) {
      assert.execQuery(Question.findById(id), function (promise) {
        promise.then(callback);
      });
    },
    insertQuestion: function (query, callback) {
      Question.create(query, function (err, doc) {
        if (err) console.error('Erro ao inserir pergunta: ' + err);

        callback(doc);
      });
    },
    updateQuestion: function (contract, callback) {
      contract.save(function (err, question) {
        if (err) console.error('Não foi possível atualizar pergunta: ' + err);

        callback(question);
      });
    },
    removeQuestion: function (query, callback) {
      Question.remove(query, callback);
    }
  };
};
