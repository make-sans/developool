const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../../validation/register');
const Account = require('../../models/Account');

const router = express.Router();

// /api/accounts POST
router.post('/', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { username, email, password } = req.body;

  Account.findOne({ email })
    .then(account => {
      if (account) {
        res.status(409).json({ email: 'User already exists' });
        return;
      }

      const newAccount = new Account({
        username,
        email
      });

      bcrypt.genSalt(10, (saltingError, salt) => {
        if (saltingError) throw saltingError;

        bcrypt.hash(password, salt, (hashingError, hash) => {
          if (hashingError) throw hashingError;
          newAccount.passwordHash = hash;

          newAccount
            .save()
            .then((account) => {
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
            .catch((err) => {
              res.status(500).json({ msg: 'Something wen\'t wrong' });
              console.log(err);
            });
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ msg: 'Something wen\'t wrong' });
      console.log(err)
    });
});

// router.delete('/:id', (req, res) => {
//   Account.findById(req.params.id)
//     .then(account => {
//       account.remove().then(() => res.json({ success: true }));
//     })
//     .catch(err => {
//       res.status(404).json({ success: false });
//       console.log(err);
//     });
// });

// router.put('/:id', (req, res) => {
//   Account.findById(req.params.id)
//     .then(account => {
//       account.username = req.body.username || account.username;
//       account.passwordHash = req.body.password || account.passwordHash;
//       account.email = req.body.email || account.email;

//       account
//         .save()
//         .then(acc => res.json(acc))
//         .catch(err => {
//           res.status(500).json({ success: false });
//           console.log(err);
//         });
//     })
//     .catch(err => {
//       res.status(404).json({ success: false });
//       console.log(err);
//     });
// });

module.exports = router;
