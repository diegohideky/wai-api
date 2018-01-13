'use strict';

module.exports = function (app) {
  var ctrl = app.controllers.school;
  app.get('/api/schools', ctrl.findAll);
  app.post('/api/school', ctrl.insert);
  app.put('/api/school', ctrl.update);
  app.delete('/api/school', ctrl.remove);
};
