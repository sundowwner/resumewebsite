"use strict";
var mongoose = require("mongoose");
var BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    post: { type: String, required: true },
    publish: { type: Number, min: 0, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    tag: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});
exports.Blog = mongoose.model("Blog", BlogSchema);
