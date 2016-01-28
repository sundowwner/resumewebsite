"use strict";
import express = require("express");
import jwt = require("express-jwt");
let mongoose = require("mongoose");

let router = express.Router();
let User = mongoose.model('User');
let Blog = mongoose.model('Blog');
let Comment = mongoose.model('Comment');
let Tag = mongoose.model("Tag");

let auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload"
});

router.get("/", (req,res,next) => {
    Tag.find({})
    .exec((err,tags) => {
        if(err) return next (err);
        res.json(tags);
    });
});

router.get("/:id", (req,res,next) => {
    Tag.findOne({_id: req.params.id})
    .populate("createdBy", "username email")
    .exec((err, tag) => {
        if (err) return next (err);
        if (!tag) return next ({ message: "Could not find your Tag. "});
        res.send(tag);
    });
});

router.post("/", auth, (req,res,next) => {
    Blog.findOne({_id: req.body.blog })
    .exec((err, blog) => {
        if (err) return next (err);
        if (!blog) return next ({ status: 404, message: "Blog could not be found. "});
        req["blog"] = blog;
        next();
    });
});

router.post("/", (req,res,next) => {
    Tag.findOne({tagmessage: req.body.tagmessage })
    .exec((err, tag) => {
        if (err) return next (err);
        if (tag) {
            req["blog"].tag.push(tag._id);
            req["blog"].save();
            //pushing the tag into the blog
            tag.blog.push(req["blog"]._id);
            tag.save();
            res.send(tag);
        }
        else {
            next();
        }
    });
});

router.post("/", (req,res,next) => {
    let tag = new Tag(req.body);
    //Part of the many to many relationship, blog _id is being pushed into the tag array.
    tag.created = Date.now();
    tag.deleted = null;
    tag.createdBy = req["payload"]._id;
    tag.createdByEmail = req["payload"].email;
    tag.createdByUsername = req["payload"].username;
    tag.save((err, c) => {
        if (err) return next (err);
        if (!c) return next({ message: "Error saving tag. "});
        req["blog"].tag.push(c._id);
        req["blog"].save();
        User.update({_id: req["payload"]._id}, { $push: { tag: c._id}}, (err, result) => {
            if (err) return next (err);
            c.populate("createdBy", "email username", (err, com) => {
                res.send(c);
            });
        });
    });
});

router.put("/:_id", (req,res,next) => {
    Tag.findOneAndUpdate({ _id: req.params._id}, req.body, { new: true }, (err, result) => {
        if (err) return next (err);
        if (!result) return next({ message: "Couldn't find and update the tag. "});
        res.send(result);
    });
});

//DELETE: /api/tags/:id
router.delete("/:id", auth, (req, res, next) => {
    Tag.update({ _id: req.params.id }, { deleted: Date.now() }, (err, result) => {
        if (err) return next(err);
        res.send({ message: "Deleted the tag."});
    });
});

export = router;
