const Experience = require("../models/experienceModel");
const { response } = require("express");
// const { parse } = require("dotenv/types");
const pageSizes = 10;

exports.getAllExperience = async (request, response) => {
	try {
		const pageNumber = request.query.page || 1;
		const minPrice = parseInt(request.query.minPrice) || 1;
		const maxPrice = parseInt(request.query.maxPrice) || 1000;

		const experienceList = await Experience.find({
			price: { $gt: minPrice, $lt: maxPrice }
		})
			.limit(pageSizes)
			.skip((pageNumber - 1) * pageSizes);
		console.log(pageNumber);

		const numDocuments = await Experience.countDocuments();

		response
			.status(200)
			.json({
				status: "success",
				data: experienceList,
				maxPageNum: Math.ceil(numDocuments / pageSizes)
			})
			.send(experienceList);
	} catch (error) {
		return response.status(400).json({
			status: "Fail",
			message: "get information experience Fail"
		});
	}
};

exports.createExperience = async (request, response) => {
	try {
		const { title, duration, images, country, price } = request.body;

		if (!title || !duration || !images || !country || !price) {
			return response.status(400).json({
				message: "Title, Duration, Images, Country and Price are required"
			});
		}

		const newExperience = await Experience.create(request.body);

		response.status(200).json({
			status: "Success",
			data: newExperience
		});
	} catch (error) {
		response.status(400).json({
			status: "Fail",
			message: error.message
		});
	}
};

exports.findOneExperience = async (request, response) => {
	try {
		// why params
		const exp = await Experience.findOne({ _id: request.params.experienceId });
		if (!exp) throw new Error("No experience here");
		response.status(200).json({
			status: "Success",
			data: exp
		});
	} catch (error) {
		response.status(400).json({
			status: "Fail",
			message: error.message
		});
	}
};

exports.updateExperience = async (request, response, next) => {
	const exp = await Experience.findOne({ _id: request.params.experienceId });
	if (!exp) {
		throw new Error("ko co exp");
	}

	const expFields = Object.keys(request.body);
	expFields.map((field) => (exp[field] = request.body[field]));
	await exp.save();

	response.status(200).json({
		status: "Success",
		data: exp
	});
};
