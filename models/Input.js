const { Schema, model } = require("../db/connection.js");

const newLocation = new Schema({
    name: String,
    address: String,
    hours: String,
    daily: String,
    monthly: Boolean,
    imageUrl: String
});


const UserSchema = new Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true},
        denverSpots: [newLocation],
        austinSpots: [newLocation],
        newyorkSpots: [newLocation]
    },
    { timestamps: true }
);

const User = model("User", UserSchema)

module.exports = User