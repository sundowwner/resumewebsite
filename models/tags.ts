"use strict";
import mongoose = require("mongoose");

let TagSchema = new mongoose.Schema({
    tagmessage: { type: String },
    created: { type: Number, default: Date.now },
    deleted: { type: Number, default: null},
    blog: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export let Tag = mongoose.model("Tag", TagSchema);
