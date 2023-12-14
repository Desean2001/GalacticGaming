const { Schema, model } = require('mongoose');

const gameSchema = require('./Game');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    savedGames: [gameSchema],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User'}]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('gameCount').get(function () {
    return this.savedGames.length;
});

userSchema.virtual('friendAmount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;

  