/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */

'use strict';

var encrypt     = require('./../utils/encrypt')
  , HttpStatus  = require('http-status-codes');

module.exports = function (app) {
  var repo = app.repositories.question;

  var insertQuestion = function (body, callback) {
<<<<<<< HEAD
    var query = {title: body.title};
=======
    var query = {name: body.name};
>>>>>>> 5df5f01e975a8336f015b507e212eabaeadb99dc

    repo.findQuestion(query, function (doc) {
      if (!doc) {
        insertOnDB(body, callback);
      } else {
        callback({status: HttpStatus.BAD_REQUEST, message: 'Pergunta já existe!'});
      }
    });
  };

  var insertOnDB = function (body, callback) {
    repo.insertQuestion(body, function (doc) {
      var status  = doc ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
        , message = doc ? 'Pergunta cadastrada com sucesso' : 'Não foi possível cadastrar colaborador!';

      callback({status: status, doc: doc, message: message});
    });
  };

  var updateQuestion = function (body, callback) {
    repo.findQuestionById(body._id, function (question) {
      if (question) {
        question.set(body);

        repo.updateQuestion(question, function (updated) {
          var status = updated ? HttpStatus.OK : HttpStatus.BAD_REQUEST
            , message = updated ? 'Pergunta atualizada com sucesso' : 'Não foi possível atualizar colaborador';

          callback({status: status, doc: updated, message: message});
        });
      }
    });
  };

  var removeQuestion = function (body, callback) {
    var query = {_id: body._id};

    repo.removeQuestion(query, function (err) {
      var status  = err ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK
        , message = err ? 'Não foi possível remover colaborador!' : 'Pergunta removida com sucesso!';

      callback({status: status, message: message});
    });
  };

  return {
    findAll: function (req, res) {
      repo.findQuestions(function (docs) {
        var status = docs.length > 0 ? HttpStatus.OK : HttpStatus.CREATED;

        res.status(status).send({questions: docs});
      });
    },
    insert: function (req, res) {
      var body = req.body;

      insertQuestion(body, function (response) {
        res.status(response.status).send({question: response.doc, message: response.message});
      });
    },
    update: function (req, res) {
      var body = req.body;

      updateQuestion(body, function (response) {
        res.status(response.status).send({question: response.doc, message: response.message});
      });
    },
    remove: function (req, res) {
      var body = req.body;

      removeQuestion(body, function (response) {
        res.status(response.status).send({message: response.message});
      });
    }
  };
};
