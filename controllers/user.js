/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */

'use strict';

var encrypt = require('./../utils/encrypt');

module.exports = function (app) {
  var repo = app.repositories.user;

  var insertUser = function (body, callback) {
    var query = {name: body.name};

    repo.findUser(query, function (doc) {
      if (!doc) {
        encryptPassword(body, callback);
      } else {
        callback({status: 400, doc: null, message: 'Usuário já existe!'});
      }
    });
  };

  var encryptPassword = function (body, callback) {
    encrypt.hash(body.password, function (hash) {
      if (hash) {
        body.password = hash;

        insertOnDB(body, callback);
      } else {
        callback({status: 500, doc: null, message: 'Não foi possível criptografar senha!'});
      }
    });
  };

  var insertOnDB = function (body, callback) {
    repo.insertUser(body, function (doc) {
      var status = doc ? 200 : 500
        , message = doc ? 'Usuário cadastrado com sucesso' : 'Não foi possível cadastrar usuário!';

      callback({status: status, doc: doc, message: message});
    });
  };

  return {
    findAll: function (req, res) {
      repo.findUsers(function (docs) {
        var status = docs.length > 0 ? 200 : 204;

        res.status(status).send({users: docs});
      });
    },
    insert: function (req, res) {
      var body = req.body;

      insertUser(body, function (response) {
        res.status(response.status).send({user: response.doc, message: response.message});
      });
    },
    update: function (req, res) {
      var body = req.body;

      repo.findUserById(body._id, function (user) {
        if (user) {
          user.set(body);

          repo.updateUser(user, function (updated) {
            var status = updated ? 200 : 400
              , message = updated ? 'Contrato atualizado com sucesso' : 'Não foi possível atualizar contrato';

            res.status(status).send({user: updated, message: message});
          });
        }
      });
    },
    remove: function (req, res) {
      var body = req.body
        , query = {_id: body._id};

      repo.removeUser(query, function (err) {
        var status = err ? 500 : 200
          , message = err ? 'Não foi possível remover contrato!' : 'Contrato removido com sucesso!';

        res.status(status).send({message: message});
      });
    }
  }
};