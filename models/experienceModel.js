const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema(
	{
		owner: mongoose.Types.ObjectId,
		title: {
			type: String,
			require: [true, "title is required"],
			trim: true
		},
		duration: {
			type: Number,
			required: [true, "duration is raquired"]
		},
		images: [
			{
				type: String,
				required: [true, "image is required"]
			}
		],

		country: String,
		price: {
			type: Number
			// required:[true,"price is required"]
		},
		tags: [
			{
				type: String
				// required: [true, "tags is required"]
			}
		],
		description: {
			type: String,
			trim: true
			// required: [true, "Description is required"]
		},
		items: [
			{
				type: String
				// required:[true, "items is required"]
			}
		],
		language: {
			type: String,
			default: "English"
		},
		groupSize: {
			type: Number,
			default: 1
			// required: [true, "groupSize is required"]
		}
	},
	{
		timestamps: true
	}
);

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;
