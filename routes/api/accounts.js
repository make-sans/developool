const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();
const Account = require('../../models/Account');

router.get('/', (req, res) => {
  Account.find()
    .then((accounts) => {
      res.json(accounts);
    })
    .catch(() => res.status(404).json({ accounts: [] }));
});

router.post('/', (req, res) => {
  // TODO implement json validation
  const { username, email, password } = req.body;

  if(!username || !email || !password)
    return res.status(400).json({ msg: 'Please enter all fields' });

  Account.findOne({ email: email })
    .then((account) => {
      if (account) return res.status(400).json({ msg: 'User already exists' });

      const newAccount = new Account({
        username,
        email,
        passwordHash: password,
      });

      // Create salt and hash password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, (hashingError, hash) => {
          if (hashingError) throw err;
          newAccount.passwordHash = hash;
          newAccount.save()
            .then((user) => {
              res.json({
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                },
              });
            });
        });
      });
    });
});

router.delete('/:id', (req, res) => {
  Account.findById(req.params.id)
    .then((account) => {
      account.remove().then(() => res.json({ success: true }));
    })
    .catch((err) => {
      res.status(404).json({ success: false });
      console.log(err);
    });
});

router.put('/:id', (req, res) => {
  Account.findById(req.params.id)
    .then((account) => {
      account.username = req.body.username || account.username;
      account.passwordHash = req.body.password || account.passwordHash;
      account.email = req.body.email || account.email;

      account.save()
        .then(acc => res.json(acc))
        .catch((err) => {
          res.status(500).json({ success: false });
          console.log(err);
        });
    })
    .catch((err) => {
      res.status(404).json({ success: false });
      console.log(err);
    });
});

module.exports = router;
