"use strict";
import express = require("express");
import jwt = require("express-jwt");
let mongoose = require("mongoose");
let router = express.Router();
let Blog = mongoose.model("Blog");
let User = mongoose.model("User");
let Comment = mongoose.model("Comment");
let auth = jwt ({

    userProperty: "payload",

    secret: process.env.JWT_SECRET
});

//GET: /blogs
router.get("/", (req,res,next) => {
    Blog.find({})
    .exec((err, blogs) => {
        if (err) return next(err);
        res.json(blogs);
    });
});

//GET: /blogs/:id
router.get("/:id", (req,res,next) => {
    Blog.findOne({ _id: req.params.id })
    .populate("createdBy", "username email")
    .populate("comments")
    .exec((err, blog) => {
        Comment.populate(blog.comments, {path: "createdBy", select: "username email"}, (err, out) => {
            if(err) return next(err);
            if(!blog) return next({ message: "Could not find your blog."});
            blog.comments = blog.comments.filter((comment) => (comment.deleted === null));
            res.send(blog);
        });
    });
});

//POST: /blogs
router.post("/", auth, (req,res,next) => {
    let newBlog = new Blog(req.body);
    newBlog.createdBy = req["payload"]._id;
    newBlog.save((err,blog) => {
        if (err) return next(err);
        User.update({_id: req["payload"]._id}, { $push: {"blogs": blog._id } }, (err, result) => {
            if(err) return next (err);
            res.send(blog);
        });
    });
});

//PUT: /blogs/:_id
router.put("/:_id", (req,res,next) => {
    Blog.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, (err, result) => {
        if(err) return next(err);
        if(!result) return next({ message: "Could not find and update the blog. "});
        res.send(result);
    });
});

//DELETE: /blogs/_id={{blog_id}}
router.delete("/", (req,res,next) => {
    if (!req.query._id) return next({ status: 404, message: "Please include an ID"});
    Blog.remove({ _id: req.query._id }, (err, result) => {
        res.send({ message: "SUCCESSSSS!YAAY"});
    });
});

export = router;
