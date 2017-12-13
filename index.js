/*eslint no-console: ['error', { allow: ['warn', 'error'] }] */
/**
 * @fileoverview Este arquivo tem como objetivo gerenciar as rotas da API
 * @author Diego Hideky de Oliveira Lima
 */

'use strict';

/**
 * @author Diego Hideky
 */

var express    = require('express')
  , path       = require('path')
  , bodyParser = require('body-parser')
  , session    = require('express-session')
  , passport   = require('passport')
  , load       = require('express-load')
  , access     = require('./middlewares/access')
  , app        = express();

app.use(session({
  secret: 'status server wai',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(access);

load('models')
  .then('repositories')
  .then('controllers')
  .then('routes')
  .into(app);

app.listen(process.env.PORT || 3000, function () {
  console.log('Wai on the air!');
});