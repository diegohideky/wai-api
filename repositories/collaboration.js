/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */
/**
 * @fileoverview Description here
 * @author Diego Hideky de Oliveira Lima
 */

'use strict';

var assert = require('../utils/assert');

module.exports = function (app) {
  var Collaboration = app.models.collaboration;

  return {
    findCollaborations: function (callback) {
      assert.execQuery(Collaboration.find({}), function (promise) {
        promise.then(callback);
      });
    },
    findCollaborationsBy: function(query, callback) {
      assert.execQuery(Collaboration.find(query), function(promise) {
        promise.then(callback);
      });
    },
    findCollaboration: function (query, callback) {
      assert.execQuery(Collaboration.findOne(query), function (promise) {
        promise.then(callback);
      });
    },
    findCollaborationById: function (id, callback) {
      assert.execQuery(Collaboration.findById(id), function (promise) {
        promise.then(callback);
      });
    },
    insertCollaboration: function (query, callback) {
      Collaboration.create(query, function (err, doc) {
        if (err) console.error('Erro ao inserir Colaboração: ' + err);

        callback(doc);
      });
    },
    updateCollaboration: function (contract, callback) {
      contract.save(function (err, collaboration) {
        if (err) console.error('Não foi possível atualizar Colaboração: ' + err);

        callback(collaboration);
      });
    },
    removeCollaboration: function (query, callback) {
      Collaboration.remove(query, callback);
    }
  };
};
