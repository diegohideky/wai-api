/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */

'use strict';

var encrypt     = require('./../utils/encrypt')
  , HttpStatus  = require('http-status-codes');

module.exports = function (app) {
  var repo = app.repositories.school;

  var insertSchool = function (body, callback) {
    var query = {name: body.name};

    repo.findSchool(query, function (doc) {
      if (!doc) {
        insertOnDB(body, callback);
      } else {
        callback({status: HttpStatus.BAD_REQUEST, message: 'Escola já existe!'});
      }
    });
  };

  var insertOnDB = function (body, callback) {
    repo.insertSchool(body, function (doc) {
      var status  = doc ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
        , message = doc ? 'Escola cadastrada com sucesso' : 'Não foi possível cadastrar escola!';

      callback({status: status, doc: doc, message: message});
    });
  };

  var updateSchool = function (body, callback) {
    repo.findSchoolById(body._id, function (school) {
      if (school) {
        school.set(body);

        repo.updateSchool(school, function (updated) {
          var status = updated ? HttpStatus.OK : HttpStatus.BAD_REQUEST
            , message = updated ? 'Escola atualizada com sucesso' : 'Não foi possível atualizar escola';

          callback({status: status, doc: updated, message: message});
        });
      }
    });
  };

  var removeSchool = function (body, callback) {
    var query = {_id: body._id};

    repo.removeSchool(query, function (err) {
      var status  = err ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK
        , message = err ? 'Não foi possível remover escola!' : 'Escola removida com sucesso!';

      callback({status: status, message: message});
    });
  };

  return {
    findAll: function (req, res) {
      repo.findSchools(function (docs) {
        var status = docs.length > 0 ? HttpStatus.OK : HttpStatus.CREATED;

        res.status(status).send({schools: docs});
      });
    },
    insert: function (req, res) {
      var body = req.body;

      insertSchool(body, function (response) {
        res.status(response.status).send({school: response.doc, message: response.message});
      });
    },
    update: function (req, res) {
      var body = req.body;

      updateSchool(body, function (response) {
        res.status(response.status).send({school: response.doc, message: response.message});
      });
    },
    remove: function (req, res) {
      var body = req.body;

      removeSchool(body, function (response) {
        res.status(response.status).send({message: response.message});
      });
    }
  };
};
