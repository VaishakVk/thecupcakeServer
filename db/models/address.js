const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
	{
		lat: {
			type: Number,
			required: true,
		},
		lng: {
			type: Number,
			required: true,
		},
		address_line: {
			type: String,
			required: true,
		},
		door: {
			type: String,
			required: true,
		},
		postal_code: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Address", addressSchema);
