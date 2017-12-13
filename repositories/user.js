/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */
/**
 * @fileoverview Description here
 * @author Diego Hideky de Oliveira Lima
 */

'use strict';

var assert = require('../utils/assert');

module.exports = function (app) {
  var User = app.models.user;

  return {
    findUsers: function (callback) {
      assert.execQuery(User.find({}), function (promise) {
        promise.then(callback);
      });
    },
    findUser: function (query, callback) {
      assert.execQuery(User.findOne(query), function (promise) {
        promise.then(callback);
      });
    },
    findUserById: function (id, callback) {
      assert.execQuery(User.findById(id), function (promise) {
        promise.then(callback);
      });
    },
    insertUser: function (query, callback) {
      User.create(query, function (err, doc) {
        if (err) console.error('Erro ao inserir usuário: ' + err);

        callback(doc);
      });
    },
    updateUser: function (contract, callback) {
      contract.save(function (err, user) {
        if (err) console.error('Não foi possível atualizar usuário: ' + err);

        callback(user);
      });
    },
    removeUser: function (query, callback) {
      User.remove(query, callback);
    }
  }
};