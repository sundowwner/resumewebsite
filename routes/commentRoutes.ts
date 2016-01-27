"use strict";

import express = require("express");
import jwt = require("express-jwt");
let mongoose = require("mongoose");

let router = express.Router();
let User = mongoose.model("User");
let Blog = mongoose.model("Blog");
let Comment = mongoose.model("Comment");

let auth = jwt({
    secret: process.env.JWT_SECRET
});

//POST: /api/BlogSchema
router.post("/", auth, (req, res, next) => {
    Blog.findOne({ _id: req.body.blog }).exec((err,blog) => {
        if (err) return next (err);
        if (!blog) return next({ status: 404, message: "Blog could not be found."});

        req["blog"] = blog;
        next();
    });
});

//POST: /api/comments -- Blog Exists && User Logged In
router.post("/", (req, res, next) => {
    //create the comment Object
    let comment = new Comment(req.body);
    comment.created = Date.now();
    comment.deleted = null;
    comment.createdBy = req["payload"]._id;
    comment.createdByEmail = req["payload"].email;
    comment.createdByUsername = req["payload"].username;
    comment.save((err, c ) => {
        if (err) return next(err);
        if (!c) return next({ message: "Error saving comment."});
        //push this comment into the blog we found in the route above, and save that blog
        req["blog"].comments.push(c._id);
        req["blog"].save();
        //push this comment into the logged in username
        User.update({_id: req["payload"]._id}, { $push: { comments: c._id}}, (err, result) => {
            if (err) return next (err);
            //populate the user information on the comment
            c.populate("createdBy", "email username", (err, com) => {
                //return the save comment back to the username
                res.send(c);
            });
        });
    });
});

//DELETE: /api/comments/:id
router.delete("/:id", auth, (req, res, next) => {
    Comment.update({ _id: req.params.id }, { deleted: Date.now() }, (err, result) => {
        if (err) return next(err);
        res.send({ message: "Deleted the comment."});
    });
});

export = router;
