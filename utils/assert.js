'use strict';

var assert = require('assert');

module.exports.execQuery = function (query, callback) {
  assert.ok(!(query instanceof require('mpromise')));

  var promise = query.exec();
  assert.ok(promise instanceof require('mpromise'));

  callback(promise);
};
