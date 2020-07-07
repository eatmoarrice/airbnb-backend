// create fake data
// in terminal: code seedExperiences.js

// console.log(process.argv) // get every argument in an array

const faker = require("faker");
const User = require("./models/user");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://testuser:iM4SP3spGvD2ytMd@cluster0.omv2j.mongodb.net/cluster0?retryWrites=true&w=majority");

const num = parseInt(process.argv[2]); // 2 is the index in an array that process.argv returns

async function createExperiences(numExperiences) {
	console.log(`Generating ${numExperiences} Experiences...`);
	for (let i = 0; i < num; i++) {
		let user = await User.create({
			name: faker.name.findName(),
			role: "host",
			introduction: faker.lorem.paragraphs((paragraph_count = 4), (supplemental = false)),
			avatar: faker.image.avatar(),
			email: faker.internet.email(),
			password: "123456"
		});
		console.log(`Created ${i} - ${user.name}`);
	}
}

createExperiences(num);
