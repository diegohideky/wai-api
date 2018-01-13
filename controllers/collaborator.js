/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */

'use strict';

var encrypt     = require('./../utils/encrypt')
  , HttpStatus  = require('http-status-codes');

module.exports = function (app) {
  var repo = app.repositories.collaborator;

  var insertCollaborator = function (body, callback) {
    var query = {name: body.name};

    repo.findCollaborator(query, function (doc) {
      if (!doc) {
        insertOnDB(body, callback);
      } else {
        callback({status: HttpStatus.BAD_REQUEST, message: 'Colaborador já existe!'});
      }
    });
  };

  var insertOnDB = function (body, callback) {
    repo.insertCollaborator(body, function (doc) {
      var status  = doc ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
        , message = doc ? 'Colaborador cadastrado com sucesso' : 'Não foi possível cadastrar colaborador!';

      callback({status: status, doc: doc, message: message});
    });
  };

  var updateCollaborator = function (body, callback) {
    repo.findCollaboratorById(body._id, function (collaborator) {
      if (collaborator) {
        collaborator.set(body);

        repo.updateCollaborator(collaborator, function (updated) {
          var status = updated ? HttpStatus.OK : HttpStatus.BAD_REQUEST
            , message = updated ? 'Colaborador atualizado com sucesso' : 'Não foi possível atualizar colaborador';

          callback({status: status, doc: updated, message: message});
        });
      }
    });
  };

  var removeCollaborator = function (body, callback) {
    var query = {_id: body._id};

    repo.removeCollaborator(query, function (err) {
      var status  = err ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK
        , message = err ? 'Não foi possível remover colaborador!' : 'Colaborador removido com sucesso!';

      callback({status: status, message: message});
    });
  };

  return {
    findAll: function (req, res) {
      repo.findCollaborators(function (docs) {
        var status = docs.length > 0 ? HttpStatus.OK : HttpStatus.CREATED;

        res.status(status).send({collaborators: docs});
      });
    },
    insert: function (req, res) {
      var body = req.body;

      insertCollaborator(body, function (response) {
        res.status(response.status).send({collaborator: response.doc, message: response.message});
      });
    },
    update: function (req, res) {
      var body = req.body;

      updateCollaborator(body, function (response) {
        res.status(response.status).send({collaborator: response.doc, message: response.message});
      });
    },
    remove: function (req, res) {
      var body = req.body;

      removeCollaborator(body, function (response) {
        res.status(response.status).send({message: response.message});
      });
    }
  };
};
