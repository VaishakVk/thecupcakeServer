const productRepo = require("./productRepo");
const {
	addProductSchema,
	editProductSchema,
} = require("../../schema/files/product");
const { idSchema } = require("../../schema/files/common");
const validator = require("../../schema/validator");

const addProduct = async (req, res) => {
	try {
		const productFields = req.body;
		const valid = validator.validate(addProductSchema, productFields);
		if (valid.status) {
			await productRepo.addProduct(productFields);
			return res.status(201).send({
				status: true,
				response: "Product added successfully!",
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

const editProduct = async (req, res) => {
	try {
		const productFields = { ...req.params, ...req.body };
		const valid = validator.validate(editProductSchema, productFields);
		if (valid.status) {
			const id = productFields.id;
			delete productFields.id;
			await productRepo.editProduct(id, productFields);
			return res.status(200).send({
				status: true,
				response: "Product edited successfully!",
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

const getAProduct = async (req, res) => {
	try {
		const productFields = req.params;
		const valid = validator.validate(idSchema, productFields);
		if (valid.status) {
			const productData = await productRepo.getProduct(productFields.id);
			return res.status(200).send({
				status: true,
				response: productData,
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

const getAllProducts = async (req, res) => {
	try {
		const productData = await productRepo.getAllProducts();
		return res.status(200).send({
			status: true,
			response: productData,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};

module.exports = { addProduct, editProduct, getAProduct, getAllProducts };
