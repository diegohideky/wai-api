'use strict';

module.exports = function (app) {
  // rotas de account
  var ctrl = app.controllers.account;
  app.post('/api/login', ctrl.logIn);
  app.post('/api/signup', ctrl.signUp);
  app.get('/api/logout', ctrl.logOut);
};
