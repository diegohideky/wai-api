'use strict';

module.exports = function (app) {
  var ctrl = app.controllers.account;
  app.post('/api/login', ctrl.logIn);
  app.post('/api/signin', ctrl.signIn);
  app.get('/api/logout', ctrl.logOut);
};
