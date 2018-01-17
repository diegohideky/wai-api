/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */

'use strict';

var encrypt     = require('./../utils/encrypt')
  , HttpStatus  = require('http-status-codes');

module.exports = function (app) {
  var repo = app.repositories.collaboration;

  var insertCollaboration = function (body, callback) {
    var query = {name: body.name};

    body.collaborator = body.answers[0].typed;
    body.school = body.answers[1].typed;

    insertOnDB(body, callback);
  };

  var insertOnDB = function (body, callback) {
    repo.insertCollaboration(body, function (doc) {
      var status  = doc ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
        , message = doc ? 'Colaboração cadastrada com sucesso' : 'Não foi possível cadastrar colaborador!';

      callback({status: status, doc: doc, message: message});
    });
  };

  var updateCollaboration = function (body, callback) {
    repo.findCollaborationById(body._id, function (collaboration) {
      if (collaboration) {
        collaboration.set(body);

        repo.updateCollaboration(collaboration, function (updated) {
          var status = updated ? HttpStatus.OK : HttpStatus.BAD_REQUEST
            , message = updated ? 'Colaboração atualizada com sucesso' : 'Não foi possível atualizar colaborador';

          callback({status: status, doc: updated, message: message});
        });
      }
    });
  };

  var removeCollaboration = function (body, callback) {
    var query = {_id: body._id};

    repo.removeCollaboration(query, function (err) {
      var status  = err ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK
        , message = err ? 'Não foi possível remover colaborador!' : 'Colaboração removida com sucesso!';

      callback({status: status, message: message});
    });
  };

  return {
    findAll: function (req, res) {
      repo.findCollaborations(function (docs) {
        var status = docs.length > 0 ? HttpStatus.OK : HttpStatus.CREATED;

        res.status(status).send({collaborations: docs});
      });
    },
    insert: function (req, res) {
      var body = req.body;

      console.log(body);

      insertCollaboration(body, function (response) {
        res.status(response.status).send({collaboration: response.doc, message: response.message});
      });
    },
    update: function (req, res) {
      var body = req.body;

      updateCollaboration(body, function (response) {
        res.status(response.status).send({collaboration: response.doc, message: response.message});
      });
    },
    remove: function (req, res) {
      var body = req.body;

      removeCollaboration(body, function (response) {
        res.status(response.status).send({message: response.message});
      });
    }
  };
};
