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
	...userSchema,
};
const customerSchema = new mongoose.Schema(customerObj, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
