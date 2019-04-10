const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Account = mongoose.model('account', AccountSchema);
module.exports = Account;
