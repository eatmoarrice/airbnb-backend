// create fake data
// in terminal: code seedExperiences.js

// console.log(process.argv) // get every argument in an array

const faker = require("faker");
const Experience = require("./models/experienceModel");
const User = require("./models/user");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://testuser:iM4SP3spGvD2ytMd@cluster0.omv2j.mongodb.net/cluster0?retryWrites=true&w=majority");

const num = parseInt(process.argv[2]); // 2 is the index in an array that process.argv returns

async function createExperiences(numExperiences) {
	const hostList = await User.find({ role: "host" });
	console.log(`Generating ${numExperiences} Experiences...`);
	for (let i = 0; i < num; i++) {
		let ownerIndex = Math.floor(Math.random() * 20);
		let images = [];
		for (let x = 0; x < 5; x++) {
			images[x] = faker.random.image();
		}
		let experience = await Experience.create({
			title: faker.lorem.sentence(),
			description: faker.lorem.paragraphs((paragraph_count = 3), (supplemental = false)),
			images: images,
			country: faker.address.country(),
			groupSize: faker.random.number(20) + 1,
			duration: faker.random.number(200) + 30,
			price: faker.random.number(200),
			owner: hostList[ownerIndex]._id
		});
		console.log(`Created ${i} - ${experience.title}`);
	}
}

createExperiences(num);
