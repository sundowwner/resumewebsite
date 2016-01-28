"use strict";
var mongoose = require("mongoose");
var TagSchema = new mongoose.Schema({
    tagmessage: { type: String },
    created: { type: Number, default: Date.now },
    deleted: { type: Number, default: null },
    blog: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
exports.Tag = mongoose.model("Tag", TagSchema);
