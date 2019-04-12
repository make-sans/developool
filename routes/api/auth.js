const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const Account = require('../../models/Account');
const auth = require('../../middleware/auth');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

// /api/auth POST
router.post('/', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
    return;
  }

  const { email, password } = req.body;

  Account.findOne({ email })
    .then((account) => {
      if (!account) {
        res.status(401).json({ email: 'Invalid credentials' });
        return;
      }

      bcrypt.compare(password, account.passwordHash)
        .then((match) => {
          if (!match) {
            res.status(401).json({ password: 'Invalid credentials' });
            return;
          }

          jwt.sign(
            {
              id: account.id,
              username: account.username,
              email: account.email,
            },
            config.get('jwtSecret'),
            { 
              expiresIn: 3600
            },
            (tokenError, token) => {
              if (tokenError) throw tokenError;
              res.status(200).json(token);
            }
          );
        })
    });
});

// /api/auth/user GET
router.get('/user', auth, (req, res) => {
  Account.findById(req.user.id)
    .select('-passwordHash')
    .then((account) => {
      res.json(account);
    })
});

module.exports = router;