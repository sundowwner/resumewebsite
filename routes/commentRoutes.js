"use strict";
var express = require("express");
var jwt = require("express-jwt");
var mongoose = require("mongoose");
var router = express.Router();
var User = mongoose.model("User");
var Blog = mongoose.model("Blog");
var Comment = mongoose.model("Comment");
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload"
});
router.get("/", function (req, res, next) {
    Comment.find({})
        .exec(function (err, comments) {
        if (err)
            return next(err);
        res.json(comments);
    });
});
router.get("/:id", function (req, res, next) {
    Comment.findOne({ _id: req.params.id })
        .populate("createdBy", "username email")
        .exec(function (err, comment) {
        if (err)
            return next(err);
        if (!comment)
            return next({ message: "Could not find your comment." });
        res.send(comment);
    });
});
router.post("/", auth, function (req, res, next) {
    Blog.findOne({ _id: req.body.blog }).exec(function (err, blog) {
        if (err)
            return next(err);
        if (!blog)
            return next({ status: 404, message: "Blog could not be found." });
        console.log(err);
        req["blog"] = blog;
        console.log(err);
        next();
    });
});
router.post("/", function (req, res, next) {
    var comment = new Comment(req.body);
    comment.created = Date.now();
    comment.deleted = null;
    comment.createdBy = req["payload"]._id;
    comment.createdByEmail = req["payload"].email;
    comment.createdByUsername = req["payload"].username;
    comment.save(function (err, c) {
        if (err)
            return next(err);
        console.log(req["payload"]);
        if (!c)
            return next({ message: "Error saving comment." });
        req["blog"].comments.push(c._id);
        console.log(c._id);
        req["blog"].save();
        User.update({ _id: req["payload"]._id }, { $push: { comments: c._id } }, function (err, result) {
            if (err)
                return next(err);
            console.log(req["payload"]);
            c.populate("createdBy", "email username", function (err, com) {
                res.send(c);
            });
        });
    });
});
router.put("/:_id", function (req, res, next) {
    Comment.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ message: "Couldn't find and update the comment. " });
        res.send(result);
    });
});
router.delete("/:id", auth, function (req, res, next) {
    Comment.update({ _id: req.params.id }, { deleted: Date.now() }, function (err, result) {
        if (err)
            return next(err);
        res.send({ message: "Deleted the comment." });
    });
});
module.exports = router;
