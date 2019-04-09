const express = require('express');

const router = express.Router();
const Account = require('../../models/Account');

router.get('/', (req, res) => {
  Account.find()
    .then((accounts) => {
      res.json(accounts);
    })
    .catch(err => res.status(404).json({ accounts: [] }));
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

module.exports = router;
