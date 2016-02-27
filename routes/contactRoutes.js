"use strict";
var express = require("express");
var jwt = require("express-jwt");
var mongoose = require("mongoose");
var router = express.Router();
var User = mongoose.model('User');
var Blog = mongoose.model('Blog');
var Comment = mongoose.model('Comment');
var Tag = mongoose.model("Tag");
var Contact = mongoose.model("Contact");
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload"
});
router.post("/", function (req, res, next) {
    var newContact = new Contact(req.body);
    newContact.save(function (err, contact) {
        if (err)
            return next(err);
        res.send(contact);
    });
});
module.exports = router;
