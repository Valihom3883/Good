const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'trader', 'admin'], default: 'user' },
  isBlocked: { type: Boolean, default: false },
  twoFactorSecret: { type: String },
  isTwoFactorEnabled: { type: Boolean, default: false },
  kyc: {
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    documentUrl: { type: String },
  },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.enable2FA = function() {
  const secret = speakeasy.generateSecret({ length: 20 });
  this.twoFactorSecret = secret.base32;
  return secret.otpauth_url;
};

UserSchema.methods.verify2FAToken = function(token) {
  return speakeasy.totp.verify({
    secret: this.twoFactorSecret,
    encoding: 'base32',
    token,
    window: 1
  });
};

module.exports = mongoose.model('User', UserSchema);
