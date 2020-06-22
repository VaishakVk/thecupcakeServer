const customerRepo = require("./customerRepo");
const { signUpSchema, loginSchema } = require("../../schema/files/auth");
const {
	addAddressSchema,
	addToCartSchema,
	removeFromCartSchema,
} = require("../../schema/files/customer");
const { idSchema } = require("../../schema/files/common");
const validator = require("../../schema/validator");

const signUp = async (req, res) => {
	try {
		const customerFields = req.body;
		const valid = validator.validate(signUpSchema, customerFields);
		if (valid.status) {
			await customerRepo.signup(customerFields);
			return res.status(201).send({
				status: true,
				response: "Signed up successfully!",
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

const login = async (req, res) => {
	try {
		const customerFields = req.body;
		const valid = validator.validate(loginSchema, customerFields);
		if (valid.status) {
			const token = await customerRepo.login(
				customerFields.email,
				customerFields.password
			);
			return res.status(200).send({
				status: true,
				response: token,
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

const getMyProfile = async (req, res) => {
	try {
		const customerFields = { id: String(req.user._id) };
		const valid = validator.validate(idSchema, customerFields);
		if (valid.status) {
			const customerData = await customerRepo.getCustomerProfileById(
				customerFields.id
			);
			return res.status(200).send({
				status: true,
				response: customerData,
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

const addNewAddress = async (req, res) => {
	try {
		const customerFields = {
			customerId: String(req.user._id),
			...req.body,
		};
		const valid = validator.validate(addAddressSchema, customerFields);
		if (valid.status) {
			await customerRepo.addAdress(customerFields.customerId, req.body);
			return res.status(200).send({
				status: true,
				response: "New address created",
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

const addToCart = async (req, res) => {
	try {
		const customerFields = {
			customerId: String(req.user._id),
			...req.body,
		};
		const valid = validator.validate(addToCartSchema, customerFields);
		if (valid.status) {
			await customerRepo.addToCart(
				customerFields.customerId,
				customerFields.productId,
				customerFields.quantity
			);
			return res.status(200).send({
				status: true,
				response: "Added to cart",
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
const removeFromCart = async (req, res) => {
	try {
		const customerFields = {
			customerId: String(req.user._id),
			...req.body,
		};
		const valid = validator.validate(removeFromCartSchema, customerFields);
		if (valid.status) {
			await customerRepo.removeFromCart(
				customerFields.customerId,
				customerFields.productId
			);
			return res.status(200).send({
				status: true,
				response: "Removed From cart",
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

module.exports = {
	signUp,
	login,
	getMyProfile,
	addNewAddress,
	addToCart,
	removeFromCart,
};
