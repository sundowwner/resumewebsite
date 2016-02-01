"use strict";
import mongoose = require("mongoose");

let ContactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true},
    message: {type: String, required: false},
    created: { type: Date, required: Date.now()}
});

export let Contact = mongoose.model("Contact", ContactSchema);
