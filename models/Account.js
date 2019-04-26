const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

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
  profile: {
    id: Schema.Types.ObjectId,
    required: true,
    ref: 'profile'
  },
});

const Account = mongoose.model('account', AccountSchema);
module.exports = Account;
