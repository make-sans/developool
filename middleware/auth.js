const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ msg: 'Not authenticated!' });
    return;
  }

  jwt.verify(token, config.get('jwtSecret'), (err, decoded) => {
    if (err) {
      res.status(401).json({ token: 'Token is invalid' });
      return;
    }

    req.user = decoded;
    next();
  });
}

module.exports = auth;