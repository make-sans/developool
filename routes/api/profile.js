const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const Account = require('../../models/Account');

router = require('express').Router();

router.get('/:account_id', (req, res) => {
  Account.findById(req.params.account_id, (err, account) => {
    if (err) {
      res.status(500).json({ msg: 'Something went wrong.' });
      console.log(err);
      return;
    }

    if (!account) {
      res.status(404).json({ msg: 'Account wasn\'t found' });
      return;
    }

    if (account.profileId === undefined) {
      res.status(404).end();
      return;
    }

    Profile.findById(account.profileId, (err, profile) => {
      if (err) {
        res.status(500).end();
        console.log(err);
        return;
      }

      if (profile) {
        res.status(200).json(profile);
      }
    });
  })
})

/* Creates a profile for the authenticated account.
*
* /api/profile/ POST
* Protected
*/
router.post('/', auth, (req, res) => {
  // No need for validation, since the Schema will only grab what's needed and
  // there are no required fields.

  Account.findById(req.account.id, (err, account) => {
    if (err) {
      res.status(500).json({ msg: 'Something went worng.' });
      console.log(err);
      return;
    }

    // This shouldn't be nessessary, but I guess you can never be too safe...
    if (!account) {
      res.status(404).json({ msg: 'Account wasn\'t found' })
      return;
    }

    if (account.profileId !== undefined) {
      res.status(404)
        .json({ msg: 'A profile already exists, try updating it.' });
      return;
    }

    const { profile } = req.body;
    const newProfile = new Profile(profile);

    
    newProfile.save()
    .then((profile) => {
      account.profileId = profile.id;
      account.save()
        .then(() => {
          res.status(200).json(profile);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json({ msg: 'Something went worng.' });
      console.log(err);
    });
  })
})

module.exports = router;