const mongoose = require("mongoose");
const constants = require("../../constants");

const productSchema = new mongoose.Schema(
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
		purchaseable: {
			type: Boolean,
			required: true,
			default: true,
		},
		categories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Category",
			},
		],
		unit_of_measure: {
			type: String,
			enum: [constants.uom.kg, constants.uom.litre, constants.uom.units],
			required: true,
		},
		price_per_uom: {
			type: Number,
			required: true,
		},
		uom_quantities: {
			type: [Number],
		},
		offer: {
			type: String,
		},
		time_required_mins: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
