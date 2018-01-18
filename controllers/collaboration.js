/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */

'use strict';

var encrypt     = require('./../utils/encrypt')
  , HttpStatus  = require('http-status-codes');

module.exports = function (app) {
  var repo = app.repositories.collaboration
    , repoCollaborator = app.repositories.collaborator
    , repoSchool = app.repositories.school;

  var initAttributes = function() {
    return [
      {name: 'LIFECOST', score: 0, count: 0},
      {name: 'LIFEQUAL', score: 0, count: 0},
      {name: 'SUPPORT', score: 0, count: 0},
      {name: 'TEACHERS', score: 0, count: 0},
      {name: 'INFRA', score: 0, count: 0},
      {name: 'JOBS', score: 0, count: 0},
      {name: 'UGROUP', score: 0, count: 0},
      {name: 'ABROAD', score: 0, count: 0}
    ];
  };

  var attributes = initAttributes();

  var insertCollaboration = function (body, callback) {    
    body.collaborator = body.answers[0].typed;
    body.school = body.answers[1].typed;
    
    var query = {name: body.collaborator};
    
    findCollaborator(query, function() {
      insertOnDB(body, callback);
    });
  };

  var findCollaborator = function (query, callback) {
    repoCollaborator.findCollaborator(query, function (doc) {
      if (!doc) {
        var body = {name: query.name};

        insertCollaboratorOnDB(body, callback);
      } else {
        console.warn('Colaborador já existe!');
        callback();
      }
    });
  };

  var insertCollaboratorOnDB = function (body, callback) {
    repoCollaborator.insertCollaborator(body, function (doc) {
      var msg = doc ? 'Colaborador cadastrado com sucesso' : 'Colaborador não foi cadastrado'; 
      
      console.warn(msg);

      callback();
    });
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

  var findSchool = function(collaboration) {
    var query = {name: collaboration.school};

    repoSchool.findSchool(query, function(school) {
      if (school) {
        calculateScores(school);
      } else {
        console.warn('Escola não existe');
      }
    });
  };

  var calculateScores = function(school) {
    var query = {school: school.name};

    repo.findCollaborationsBy(query, function(collaborations) {

      collaborations.forEach(function(colab) {  
        var attributes = initAttributes();

        colab.answers.forEach(function(answer) {
          var question = answer.question;
          
          if (question.answerType !== 'TYPING') {
            var total = 0;

            answer.choises.forEach(function(choise) {
              total += choise.value;  
            });

            question.attributes.forEach(function(questionAtt) {
              attributes.forEach(function(att) {
                if (att.name === questionAtt.name) {
                  att.score = att.score + total;
                  att.count = att.count + 1;
                }
              });
            });
          }
        });
        
        if (school.attributes.length == 0) {
          school.attributes = attributes;
        } else {
          attributes.forEach(function(att) {
            var found = false;
            
            school.attributes.forEach(function(schoolAtt) {
              if (att.name === schoolAtt.name) {
                schoolAtt.score = schoolAtt.score + att.score;
                schoolAtt.count = schoolAtt.count + att.count;
                found = true;
              }
            });

            if (!found) {
              school.attributes.push(att);
            }
          });
        }

        repoSchool.updateSchool(school, function(updatedSchool) {
          var msg = updatedSchool ? 'Atributos de escolas salvo com sucesso' : 'Erro ao atualizar atributos de escola';
          console.warn(msg);
        });
      });
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

      insertCollaboration(body, function (response) {
        findSchool(response.doc);
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
