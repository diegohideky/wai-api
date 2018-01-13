/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */
/**
 * @fileoverview Description here
 * @author Diego Hideky de Oliveira Lima
 */

'use strict';

var assert = require('../utils/assert');

module.exports = function (app) {
  var Collaborator = app.models.collaborator;

  return {
    findCollaborators: function (callback) {
      assert.execQuery(Collaborator.find({}), function (promise) {
        promise.then(callback);
      });
    },
    findCollaborator: function (query, callback) {
      assert.execQuery(Collaborator.findOne(query), function (promise) {
        promise.then(callback);
      });
    },
    findCollaboratorById: function (id, callback) {
      assert.execQuery(Collaborator.findById(id), function (promise) {
        promise.then(callback);
      });
    },
    insertCollaborator: function (query, callback) {
      Collaborator.create(query, function (err, doc) {
        if (err) console.error('Erro ao inserir colaborador: ' + err);

        callback(doc);
      });
    },
    updateCollaborator: function (contract, callback) {
      contract.save(function (err, collaborator) {
        if (err) console.error('Não foi possível atualizar colaborador: ' + err);

        callback(collaborator);
      });
    },
    removeCollaborator: function (query, callback) {
      Collaborator.remove(query, callback);
    }
  };
};
