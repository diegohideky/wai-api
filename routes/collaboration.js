'use strict';

module.exports = function (app) {
  var ctrl = app.controllers.collaboration;
  app.get('/api/collaborations', ctrl.findAll);
  app.post('/api/collaboration', ctrl.insert);
  app.put('/api/collaboration', ctrl.update);
  app.delete('/api/collaboration', ctrl.remove);
};
