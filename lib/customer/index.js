const customerRepo = require("./customerRepo");
const { signUpSchema, loginSchema } = require("../../schema/files/auth");
const { addAddressSchema } = require("../../schema/files/customer");
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
		const customerFields = { ...req.params, ...req.body };
		const valid = validator.validate(addAddressSchema, customerFields);
		if (valid.status) {
			await customerRepo.addAdress(req.params.customerId, req.body);
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

module.exports = { signUp, login, getMyProfile, addNewAddress };
