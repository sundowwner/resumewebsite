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
router.get("/", function (req, res, next) {
    Contact.find({})
        .exec(function (err, contacts) {
        if (err)
            return next(err);
        res.json(contacts);
    });
});
router.get("/:id", function (req, res, next) {
    Contact.findOne({ _id: req.params.id })
        .populate("createdBy", "username email")
        .exec(function (err, contact) {
        if (err)
            return next(err);
        if (!contact)
            return next({ message: "Could not find your contact." });
        res.send(contact);
    });
});
router.post("/", function (req, res, next) {
    var contact = new Contact(req.body);
    contact.save(function (err, c) {
        if (err)
            return next(err);
        console.log(req["payload"]);
        if (!c)
            return next({ message: "Error saving contact." });
        req["contact"].contacts.push(c._id);
        req["contact"].save();
        res.send(c);
    });
});
router.put("/:_id", function (req, res, next) {
    Contact.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ message: "Couldn't find and update the comment." });
        res.send(result);
    });
});
module.exports = router;
