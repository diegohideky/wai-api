'use strict';

module.exports = function (app) {
  var ctrl = app.controllers.collaborator;
  app.get('/api/collaborators', ctrl.findAll);
  app.post('/api/collaborator', ctrl.insert);
  app.put('/api/collaborator', ctrl.update);
  app.delete('/api/collaborator', ctrl.remove);
};
