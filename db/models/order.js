const mongoose = require("mongoose");
const constants = require("../../constants");

const orderSchema = new mongoose.Schema(
	{
		customer_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Customer",
			required: true,
		},
		products: [
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
				price: {
					type: Number,
					required: true,
				},
			},
		],
		total_price: {
			type: Number,
			required: true,
		},
		tax: {
			type: Number,
			required: true,
			default: 0,
		},
		address: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Address",
			required: true,
		},
		delivery_time: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			required: true,
			enum: [
				constants.orderStatus.initiated,
				constants.orderStatus.delivered,
				constants.orderStatus.dispatched,
				constants.orderStatus.payment_failed,
				constants.orderStatus.prepared,
				constants.orderStatus.preparing,
				constants.orderStatus.received,
			],
			default: constants.orderStatus.initiated,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
