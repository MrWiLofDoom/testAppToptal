// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new Schema(
    {
        id: Number,
        user_id: String,
        restaurant_name: String,
        review: String,
        rank: {
            price: Number,
            speed: Number,
            quality: Number
        }
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);