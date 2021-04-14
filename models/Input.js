const { Schema, model } = require("../db/connection.js");

const newLocation = new Schema({
    name: String,
    address: String,
    hours: String,
    daily: String,
    monthly: Boolean,
    imageUrl: String
});

const newReview = new Schema({
    rating: Number,
    review: String
});

const UserSchema = new Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true},
        locations: [newLocation],
        reviews: [newReview]
    },
    { timestamps: true }
);

const User = model("User", UserSchema)

module.exports = User