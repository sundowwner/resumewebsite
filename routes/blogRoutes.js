"use strict";
var express = require("express");
var jwt = require("express-jwt");
var mongoose = require("mongoose");
var router = express.Router();
var Blog = mongoose.model("Blog");
var User = mongoose.model("User");
var Comment = mongoose.model("Comment");
var Tag = mongoose.model("Tag");
var auth = jwt({
    userProperty: "payload",
    secret: process.env.JWT_SECRET
});
router.get("/", function (req, res, next) {
    Blog.find({})
        .populate("tag")
        .exec(function (err, blogs) {
        if (err)
            return next(err);
        res.json(blogs);
    });
});
router.get("/:id", function (req, res, next) {
    Blog.findOne({ _id: req.params.id })
        .populate("createdBy", "username email")
        .populate("comments")
        .exec(function (err, blog) {
        Comment.populate(blog.comments, { path: "createdBy", select: "username email" }, function (err, out) {
            if (err)
                return next(err);
            if (!blog)
                return next({ message: "Could not find your blog." });
            blog.comments = blog.comments.filter(function (comment) { return (comment.deleted === null); });
            res.send(blog);
        });
    });
});
router.post("/", auth, function (req, res, next) {
    var newBlog = new Blog(req.body);
    newBlog.dateCreated = new Date();
    newBlog.createdBy = req["payload"]._id;
    newBlog.save(function (err, blog) {
        if (err)
            return next(err);
        User.update({ _id: req["payload"]._id }, { $push: { "blogs": blog._id } }, function (err, result) {
            if (err)
                return next(err);
            res.send(blog);
        });
    });
});
router.put("/:_id", function (req, res, next) {
    Blog.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ message: "Could not find and update the blog. " });
        res.send(result);
    });
});
router.delete("/", function (req, res, next) {
    if (!req.query._id)
        return next({ status: 404, message: "Please include an ID" });
    Blog.remove({ _id: req.query._id }, function (err, result) {
        res.send({ message: "SUCCESSSSS!YAAY" });
    });
});
module.exports = router;
