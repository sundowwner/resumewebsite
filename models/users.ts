"use strict";
import mongoose = require("mongoose");
import crypto = require("crypto");
import jwt = require("jsonwebtoken");

let UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true },
  email: { type: String, unique: true, lowercase: true },
  passwordHash: String,
  salt: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag"}]
});

UserSchema.method('setPassword', function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
});

UserSchema.method('validatePassword', function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return (hash === this.passwordHash);
});

UserSchema.method('generateJWT', function() {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email
    // secret must match the one in the route
}, process.env.JWT_SECRET);
});

export let User = mongoose.model('User', UserSchema);
