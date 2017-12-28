/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */

'use strict';

var encrypt = require('./../utils/encrypt');

module.exports = function (app) {
  var repo = app.repositories.user;

  var logInUser = function (body, callback) {
    var query = {email: body.email};

    repo.findUser(query, function (user) {
      if (user) {
        comparePasswords(body, user, callback);
      } else {
        callback({status: 403, doc: null, message: 'Usuário não encontrado!'});
      }
    });
  };

  var insertNewUser = function (body, callback) {
    var query = {name: body.name};
    if (body.password !== body.passwordRepeated) {
      callback({status: 400, message: 'Senhas incompatíveis'});
    } else {
      repo.findUser(query, function (user) {
        if (user) {
          callback({status: 400, message: 'Usuário já existe!'});
        } else {
          encryptPassword(body, callback);
        }
      });
    }
  };

  var encryptPassword = function (body, callback) {
    encrypt.hash(body.password, function (hash) {
      if (!hash) {
        callback({status: 400, message: 'Não foi possível criptografar senha!'});
      } else {
        body.password = hash;

        repo.insertUser(body, function (doc) {
          var status = doc ? 200 : 400
            , message = doc ? 'Usuário cadastrado com sucesso' : 'Não foi possível criar usuário';

          callback({status: status, doc: doc, message: message});
        });
      }
    });
  };

  var comparePasswords = function (body, user, callback) {
    encrypt.compare(body.password, user.password, function (valid) {
      var status = valid ? 200 : 500
        , message = valid ? 'Usuário logado' : 'Senha inválida';

      callback({status: status, doc: user, message: message});
    });
  };

  var userSession = function (user, remember) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      remember: remember
    };
  };

  return {
    logIn: function (req, res) {
      var body = req.body;

      logInUser(body, function(response) {
        if (response.status === 200) {
          req.session.account = userSession(response.doc, body.remember);
        }

        res.status(response.status).send({user: response.doc, message: response.message});
      });
    },
    signIn: function (req, res) {
      var body = req.body;

      insertNewUser(body, function (response) {
        if (response.status === 200) {
          req.session.account = userSession(response.doc);
        }

        res.status(response.status).send({user: response.doc, message: response.message});
      });
    },
    logOut: function (req, res) {
      req.session.destroy();

      res.status(200).send({message: 'Usuário deslogado!'});
    }
  };
};