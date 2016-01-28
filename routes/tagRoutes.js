"use strict";
var express = require("express");
var jwt = require("express-jwt");
var mongoose = require("mongoose");
var router = express.Router();
var User = mongoose.model('User');
var Blog = mongoose.model('Blog');
var Comment = mongoose.model('Comment');
var Tag = mongoose.model("Tag");
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload"
});
router.get("/", function (req, res, next) {
    Tag.find({})
        .exec(function (err, tags) {
        if (err)
            return next(err);
        res.json(tags);
    });
});
router.get("/:id", function (req, res, next) {
    Tag.findOne({ _id: req.params.id })
        .populate("createdBy", "username email")
        .exec(function (err, tag) {
        if (err)
            return next(err);
        if (!tag)
            return next({ message: "Could not find your Tag. " });
        res.send(tag);
    });
});
router.post("/", auth, function (req, res, next) {
    Blog.findOne({ _id: req.body.blog })
        .exec(function (err, blog) {
        if (err)
            return next(err);
        if (!blog)
            return next({ status: 404, message: "Blog could not be found. " });
        req["blog"] = blog;
        next();
    });
});
router.post("/", function (req, res, next) {
    Tag.findOne({ tagmessage: req.body.tagmessage })
        .exec(function (err, tag) {
        if (err)
            return next(err);
        if (tag) {
            req["blog"].tag.push(tag._id);
            req["blog"].save();
            tag.blog.push(req["blog"]._id);
            tag.save();
            res.send(tag);
        }
        else {
            next();
        }
    });
});
router.post("/", function (req, res, next) {
    var tag = new Tag(req.body);
    tag.created = Date.now();
    tag.deleted = null;
    tag.createdBy = req["payload"]._id;
    tag.createdByEmail = req["payload"].email;
    tag.createdByUsername = req["payload"].username;
    tag.save(function (err, c) {
        if (err)
            return next(err);
        if (!c)
            return next({ message: "Error saving tag. " });
        req["blog"].tag.push(c._id);
        req["blog"].save();
        User.update({ _id: req["payload"]._id }, { $push: { tag: c._id } }, function (err, result) {
            if (err)
                return next(err);
            c.populate("createdBy", "email username", function (err, com) {
                res.send(c);
            });
        });
    });
});
router.put("/:_id", function (req, res, next) {
    Tag.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ message: "Couldn't find and update the tag. " });
        res.send(result);
    });
});
router.delete("/:id", auth, function (req, res, next) {
    Tag.update({ _id: req.params.id }, { deleted: Date.now() }, function (err, result) {
        if (err)
            return next(err);
        res.send({ message: "Deleted the tag." });
    });
});
module.exports = router;
