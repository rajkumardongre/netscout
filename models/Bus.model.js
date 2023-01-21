const mongoose = require('mongoose');
const { Schema } = mongoose;

const busSchema = new Schema({
	start: {
		type: String,
		required: true,
	},
	end: {
		type: String,
		required: true,
	},
	avgSpeed: {
		type: Number,
		required: true,
	},
	stations: [
		{
			type: {
				name: {
					type: String,
					required: true,
				},
				distance: {
					type: Number,
					required: true,
				},
			},
		},
	],
	totalPeople: {
		type: Number,
		default: 0,
	},
	tickets: [
		{
			type: {
				from: {
					type: String,
					required: true,
				},
				to: {
					type: String,
					required: true,
				},
				noOfPeople: {
					type: Number,
					default: 1,
				},
				timestamp: {
					type: Date,
					default: new Date(),
				},
			},
		},
	],
});

module.exports = mongoose.model('Bus', busSchema);
