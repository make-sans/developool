const auth = require('../../middleware/auth');
const express = require('express');
const Account = require('../../models/Account');
const Project = require('../../models/Project')

const router = express();

// /api/accounts GET
router.get('/', auth, (req, res) => {
  // This will always return until the admin functionality is implemented
  if (!req.account.isAdmin) {
    res.status(403).end();
    return;
  }
  Account.find()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong!" });
      console.log(err);
    });
});

// /api/accounts/projects GET
router.get('/projects', auth, (req, res) => {
  Project.find({ 'owner.id' : req.account.id })
    .then((projects) => {
      res.status(200).json(projects);
    })
});



module.exports = router;