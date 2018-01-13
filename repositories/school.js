/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */
/**
 * @fileoverview Description here
 * @author Diego Hideky de Oliveira Lima
 */

'use strict';

var assert = require('../utils/assert');

module.exports = function (app) {
  var School = app.models.school;

  return {
    findSchools: function (callback) {
      assert.execQuery(School.find({}), function (promise) {
        promise.then(callback);
      });
    },
    findSchool: function (query, callback) {
      assert.execQuery(School.findOne(query), function (promise) {
        promise.then(callback);
      });
    },
    findSchoolById: function (id, callback) {
      assert.execQuery(School.findById(id), function (promise) {
        promise.then(callback);
      });
    },
    insertSchool: function (query, callback) {
      School.create(query, function (err, doc) {
        if (err) console.error('Erro ao inserir escola: ' + err);

        callback(doc);
      });
    },
    updateSchool: function (contract, callback) {
      contract.save(function (err, school) {
        if (err) console.error('Não foi possível atualizar escola: ' + err);

        callback(school);
      });
    },
    removeSchool: function (query, callback) {
      School.remove(query, callback);
    }
  };
};
