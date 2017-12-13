var bcrypt = require('bcrypt-nodejs');

module.exports.hash = function (password, callback) {
  bcrypt.hash(password, null, null, function (err, hash) {
    if (err) console.error('Erro ao criptografar senha: ' + err);

    callback(hash);
  });
};

module.exports.compare = function (password, hash, callback) {
  bcrypt.compare(password, hash, function(err, valid) {
    if (err) console.error('Erro ao comparar senhas: ' + err);

    callback(valid);
  });
};