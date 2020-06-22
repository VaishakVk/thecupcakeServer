const mongoose = require("mongoose");
const userSchema = require("./user");
const customerObj = {
	stored_adresses: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Address",
				required: true,
			},
		],
	},
	cart: {
		type: [
			{
				product_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
		default: [],
	},
	...userSchema,
};
const customerSchema = new mongoose.Schema(customerObj, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
