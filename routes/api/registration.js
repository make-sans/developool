const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const validateRegisterInput = require('../../validation/register');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Account = require('../../models/Account');
const VerificationToken = require('../../models/VerificationToken');

const router = express.Router();
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.get('emailUser'),
    pass: config.get('emailPass'),
  }
})

// /api/register POST
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
              const verificationToken = new VerificationToken({
                accountId: account.id,
                token: crypto.randomBytes(16).toString("hex"),
              });

              verificationToken.save()
                .then((token) => {
                  const link = `http://${req.headers.host}/api/register/confirm/${token.token}`;
                  const mailOptions = {
                    from: config.get('emailUser'),
                    to: account.email,
                    subject: 'Account verification',
                    text: `Please click the following link to verify your account.\n${link}\n`
                  }

                  emailTransporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                      res.status(500).json({ msg: 'Something wen\'t wrong' });
                      return;
                    }

                    res.status(200).json({ msg: `A verification email has been sent to ${account.email}.`})
                    console.log(info);
                  })
                })
                .catch((err) => {
                  res.status(500).json({ msg: 'Something wen\'t wrong' });
                  console.log(err);
                });
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

router.get('/confirm/:token', (req, res) => {
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
});

module.exports = router;
