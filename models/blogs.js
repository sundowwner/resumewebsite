"use strict";
var mongoose = require("mongoose");
var BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    post: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now() },
    dateDeleted: { type: Date, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    tag: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }]
});
exports.Blog = mongoose.model("Blog", BlogSchema);
