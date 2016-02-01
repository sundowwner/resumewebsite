"use strict";
import express = require("express");
import jwt = require("express-jwt");
let mongoose = require("mongoose");

let router = express.Router();
let User = mongoose.model('User');
let Blog = mongoose.model('Blog');
let Comment = mongoose.model('Comment');
let Tag = mongoose.model("Tag");
let Contact = mongoose.model("Contact");

let auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload"
});

router.get("/", (req,res,next) => {
    Contact.find({})
    .exec((err,contacts) => {
        if (err) return next (err);
        res.json(contacts);
    });
});

router.get("/:id", (req,res,next) => {
    Contact.findOne({_id: req.params.id})
    .populate("createdBy", "username email")
    .exec((err,contact) => {
        if (err) return next (err);
        if (!contact) return next ({ message: "Could not find your contact."});
        res.send(contact);
    });
});



router.post("/", (req,res,next) => {
    let contact = new Contact(req.body);
    contact.save((err, c) => {
        if (err) return next (err);
        console.log(req["payload"])
        if (!c) return next({ message: "Error saving contact."});
        req["contact"].contacts.push(c._id);
        req["contact"].save();
        res.send(c);
    });
});

router.put("/:_id", (req, res, next) => {
    Contact.findOneAndUpdate({_id: req.params._id}, req.body, { new: true}, (err, result) => {
        if (err) return next (err);
        if (!result) return next({ message: "Couldn't find and update the comment."});
        res.send(result);
    });
});

export = router;
