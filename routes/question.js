'use strict';

module.exports = function (app) {
  var ctrl = app.controllers.question;
  app.get('/api/questions', ctrl.findAll);
  app.post('/api/question', ctrl.insert);
  app.put('/api/question', ctrl.update);
  app.delete('/api/question', ctrl.remove);
};
