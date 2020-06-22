const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		display_name: {
			type: String,
			required: true,
		},
		is_deleted: {
			type: Boolean,
			required: true,
			default: false,
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);
