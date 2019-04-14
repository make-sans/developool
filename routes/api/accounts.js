const express = require('express');
const Account = require('../../models/Account');
const auth = require('../../middleware/auth');

const router = express.Router();

// /api/accounts GET
router.get('/', auth, (_, res) => {
  Account.find()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong!" });
      console.log(err);
  });
});