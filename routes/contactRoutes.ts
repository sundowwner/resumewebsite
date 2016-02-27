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


//POST: posting / saving contact information to the mongo database.
router.post("/", (req,res,next) =>{
    let newContact = new Contact(req.body);
    newContact.save((err,contact) => {
        if(err) return next(err);
        res.send(contact);
    })
})


export = router;
