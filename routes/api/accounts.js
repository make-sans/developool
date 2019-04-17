const express = require('express');
const Account = require('../../models/Account');
const Project = require('../../models/Project')
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

// /api/accounts/:id GET
router.get('/:id', auth, (req, res) => {
  Account.findById(req.params.id)
    .select('-passwordHash')
    .then((account) => {
      res.json(account);
    });
})
// /api/accounts/projects GET
router.get('/projects', auth, (req, res) => {
  Project.find({ ownerId: req.account.id })
    .then((projects) => {
      res.status(200).json(projects);
    })
});

module.exports = router;