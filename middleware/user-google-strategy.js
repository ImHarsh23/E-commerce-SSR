module.exports.authenticate = require("passport").authenticate('google', { scope: ['profile'] });

module.exports.authenticateCallback = require("passport").authenticate('google', { failureRedirect: '/shop/user/login' });