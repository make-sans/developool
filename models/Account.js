const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  verified: {
    type: Boolean,
    default: false,
  },
  profileId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'profile'
  },
});

const Account = mongoose.model('account', AccountSchema);
module.exports = Account;
