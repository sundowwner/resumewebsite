"use strict";
var mongoose = require("mongoose");
var ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: false },
    created: { type: Date, required: Date.now() }
});
exports.Contact = mongoose.model("Contact", ContactSchema);
