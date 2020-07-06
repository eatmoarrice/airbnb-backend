const Review = require("../models/review")

exports.getReviewList = async (request, response) => {
    try {
        const reviewList = await Review.find({})
        response.status(200).json({
            reviewList
        })
    } catch (error) {
        response.status(400).json({
            message: "Error happens"
        })
    }
}

exports.createReview = async (request, response) => {
    try {
        const { rating, experienceId, content } = request.body
        if (!experienceId || !rating) {
            return response.status(400).json({
                message: "author, content are required"
            })
        }

        const review = await Review.create({
            user: user._id,
            content: content,
            rating: rating,
            experience: experienceId
        })

        // await review.populate({
        //     path: "user",
        //     select: "_id name"
        // }).populate({
        //     path: "experience",
        //     select: "_id title"
        // }).execPopulate();

        response.status(200).json({
            status: "success",
            data: review
        })

    } catch (error) {
        response.status(400).json({
            message: "Error happens"
        })
    }
    // const reviewInDb = await Review.findOne({ user: user._id, experience: expId });
    //     if (reviewInDb) {
    //         return response.status(400).json({
    //             status: "Fail",
    //             message: "Already created review"
    //         });
    //     };

}

exports.updateReview = async (request, response) => {
    try {
        const {rating, content} = request.body
        const review  = await Review.findOne({_id:reviewId})
        review.content = content;
        review.rating = rating;
        review.save();
        response.status(200).json({
            status:"success",
            data:review
        })

    } catch (error) {
        response.status(400).json({
            message: "Error happens"
        })
    }
}

exports.deleteReview = async (request, response) => {
    try {
        const review = await Review.findByIdAndDelete({ _id: request.params.reviewId });
        if (!review) throw new Error("Undefined review");
        response.status(200).json({
            status: "Success",
            data: null
        });

    } catch (error) {
        response.status(400).json({
            message: "Error happens"
        })
    }
}