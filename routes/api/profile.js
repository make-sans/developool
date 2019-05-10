const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const Account = require('../../models/Account');

router = require('express').Router();

/* Get currently authenticated accounts profile
 * /api/profile/ GET
 * Protected
*/
router.get('/', auth, (req, res) => {
  Account.findById(req.account.id, (err, account) => {
    if (err) {
      res.status(500).json({ msg: 'Our problem.' });
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
});

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
      res.status(409)
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
});

/* Updates a profile for the authenticated account
 *
 * /api/profile PUT
 * Protected
 */
router.put('/', auth, (req, res) => {
  Account.findById(req.account.id, (err, account) => {
    if (err) {
      res.status(500).end();
      throw err;
    }

    if (!account) {
      res.status(404).end();
      return;
    }

    if (account.profileId === undefined) {
      res.status(400).json({
        msg: 'No profile created on this account'
      });
      return;
    }

    const update = {};
    if (req.body.firstName) update.firstName = req.body.firstName;
    if (req.body.lastName) update.lastName = req.body.lastName;
    if (req.body.interests) update.interests = req.body.interests;
    if (req.body.skills) update.skills = req.body.skills;
    if (req.body.education) update.education = req.body.education;
    if (req.body.pastExperience) update.pastExperience = req.body.pastExperience;
    if (req.body.github || req.body.github === '') update.github = req.body.github;
    if (req.body.facebook || req.body.facebook === '') update.facebook = req.body.facebook;
    if (req.body.linkedin || req.body.linkedin === '') update.linkedin = req.body.linkedin;
    if (req.body.twitter || req.body.twitter === '') update.twitter = req.body.twitter;
    if (req.body.instagram || req.body.instagram === '') update.instagram = req.body.instagram;

    Profile.findByIdAndUpdate(account.profileId, { $set: update }, { new: true }, (err, profile) => {
      if (err) {
        res.status(500).end();
        throw err;
      }

      res.status(200).json(profile);
    })
  })
});

module.exports = router;