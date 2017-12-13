'use strict';

module.exports = function (app) {
  var ctrl = app.controllers.user;
  app.get('/api/users', ctrl.findAll);
  app.post('/api/user', ctrl.insert);
  app.put('/api/user', ctrl.update);
  app.delete('/api/user', ctrl.remove);
};
