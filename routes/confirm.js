const VerificationToken = require('../models/VerificationToken');
const Account = require('../models/Account');

function confirm(req, res) {
  const userToken = req.params.token;
  if (!userToken) return;

  VerificationToken.findOne({ token: userToken })
    .then((token) => {
      if (!token) {
        res.status(400).json({ msg: 'No such token found, maybe your token expired?' });
        return;
      }
      
      Account.findOne({ _id: token.accountId })
        .then((account) => {
          if (!account) {
            res.status(400).json({ msg: 'Unable to find account bound to this token.' });
            return;
          }
          if (account.verified) {
            res.status(400).json({ msg: 'This account has already been verified' });
            return;
          }

          account.verified = true;
          account.save()
            .then((account) => {
              res.status(200).json({ msg: 'Account verified successfuly' });
            })
            .catch((err) => {
              res.status(500).json({ msg: 'Something wen\'t wrong' });
            });
        })
        .catch((err) => {
          res.status(500).json({ msg: 'Something wen\'t wrong' });
        });
    })
    .catch((err) => {
      res.status(500).json({ msg: 'Something wen\'t wrong' });
    });
}

module.exports = confirm;