const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerificationTokenSchema = new Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'accounts',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200,
  },
});

const VerificationToken = mongoose.model('verificationToken', VerificationTokenSchema);
module.exports = VerificationToken;