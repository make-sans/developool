const mongoose = require('mongoose');

const VerificationTokenSchema = new mongoose.Schema({
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

const VerificationToken = mongoose.model('VerificationToken', VerificationTokenSchema);
module.exports = VerificationToken;