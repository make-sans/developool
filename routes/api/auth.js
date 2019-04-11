const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const Account = require('../../models/Account');
const auth = require('../../middleware/auth');

const router = express.Router();

router.post('/', (req, res) => {
  // const { errors, isValid } = validateRegisterInput(req.body);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  // const { username, email, password } = req.body;

  const { email, password } = req.body;
  
  Account.findOne({ email })
    .then((account) => {
      if (!account) {
        res.status(400).json({ msg: 'User doesn\'t exist' });
        return;
      }

      bcrypt.compare(password, account.passwordHash)
        .then((match) => {
          if (!match) {
            res.status(400).json({ msg: 'Invalid credentials' });
            return;
          }
          
          jwt.sign(
            { id: account.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (tokenError, token) => {
              if (tokenError) throw tokenError;
              return res.json({
                token,
                user: {
                  id: account.id,
                  username: account.username,
                  email: account.email
                }
              });
            }
          );
        })
    });
});

router.get('/user', auth, (req, res) => {
  Account.findById(req.user.id)
    .select('-passwordHash')
    .then((account) => {
      res.json(account);
    })
});

module.exports = router;