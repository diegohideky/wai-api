/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */

'use strict';

var encrypt = require('./../utils/encrypt')
  , HttpStatus  = require('http-status-codes');

module.exports = function (app) {
  var repo = app.repositories.user;

  var insertUser = function (body, callback) {
    var query = {name: body.name};

    repo.findUser(query, function (doc) {
      if (!doc) {
        encryptPassword(body, callback);
      } else {
        callback({status: HttpStatus.BAD_REQUEST, message: 'Usuário já existe!'});
      }
    });
  };

  var encryptPassword = function (body, callback) {
    encrypt.hash(body.password, function (hash) {
      if (hash) {
        body.password = hash;

        insertOnDB(body, callback);
      } else {
        callback({status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Não foi possível criptografar senha!'});
      }
    });
  };

  var insertOnDB = function (body, callback) {
    repo.insertUser(body, function (doc) {
      var status = doc ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
        , message = doc ? 'Usuário cadastrado com sucesso' : 'Não foi possível cadastrar usuário!';

      callback({status: status, doc: doc, message: message});
    });
  };

  return {
    findAll: function (req, res) {
      repo.findUsers(function (docs) {
        var status = docs.length > 0 ? HttpStatus.OK : HttpStatus.CREATED;

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
            var status = updated ? HttpStatus.OK : HttpStatus.BAD_REQUEST
              , message = updated ? 'Usuário atualizado com sucesso' : 'Não foi possível atualizar usuário';

            res.status(status).send({user: updated, message: message});
          });
        }
      });
    },
    remove: function (req, res) {
      var body = req.body
        , query = {_id: body._id};

      repo.removeUser(query, function (err) {
        var status = err ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK
          , message = err ? 'Não foi possível remover usuário!' : 'Usuário removido com sucesso!';

        res.status(status).send({message: message});
      });
    }
  }
};