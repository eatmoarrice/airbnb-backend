const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    // ko hieu ne
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    content:{
        type:String,
    },
    experience: {
        type: mongoose.Schema.ObjectId,
        ref: "Exp",
        required: [true, "Experience is required"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"]
    }
},{
    timestamps:true
});

const Review = mongoose.model("Review" , reviewSchema)
module.exports = Review;
