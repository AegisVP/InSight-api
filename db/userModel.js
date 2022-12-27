const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
  refresh_token: {
    type: String,
    default: null,
  },
  isNewUser: {
    type: Boolean,
    default: true,
  },
  googleAuth: {
    type: Boolean,
    default: false,
  },
  params: mongoose.Schema({
    height: {
      type: Number,
    },
    age: {
      type: Number,
    },
    currentWeight: {
      type: Number,
    },
    desireWeight: {
      type: Number,
    },
    bloodType: {
      type: Number,
    },
  }),
});

userSchema.pre('save', async function () {
  if (this.isNew && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
