const orderRepo = require("./orderRepo");
const { newOrderSchema } = require("../../schema/files/order");
const { idSchema } = require("../../schema/files/common");
const validator = require("../../schema/validator");

const newOrder = async (req, res) => {
	try {
		const orderFields = req.body;
		orderFields.customer_id = String(req.user._id);
		const valid = validator.validate(newOrderSchema, orderFields);
		if (valid.status) {
			await orderRepo.newOrder(orderFields);
			return res.status(200).send({
				status: true,
				response: "Order placed",
			});
		} else {
			return res
				.status(400)
				.send({ status: false, response: valid.message });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};
const progressOrder = async (req, res) => {
	try {
		const orderFields = req.params;
		const valid = validator.validate(idSchema, orderFields);
		if (valid.status) {
			await orderRepo.progressOrder(orderFields.id);
			return res.status(200).send({
				status: true,
				response: "Order updated",
			});
		} else {
			return res
				.status(400)
				.send({ status: false, response: valid.message });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};

module.exports = { newOrder, progressOrder };
