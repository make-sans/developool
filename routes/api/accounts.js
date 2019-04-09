const express = require('express');

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

  const account = new Account({
    username: req.body.username,
    email: req.body.email,
    passwordHash: req.body.password,
  });

  account.save()
    .then(acc => res.json(acc))
    .catch((err) => {
      res.status(500).json({ success: false });
      console.log(err);
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
