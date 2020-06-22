const categoryRepo = require("./categoryRepo");
const {
	addCategorySchema,
	editCategorySchema,
} = require("../../schema/files/category");
const { idSchema } = require("../../schema/files/common");
const validator = require("../../schema/validator");

const addCategory = async (req, res) => {
	try {
		const categoryFields = req.body;
		const valid = validator.validate(addCategorySchema, categoryFields);
		if (valid.status) {
			await categoryRepo.addCategory(categoryFields);
			return res.status(201).send({
				status: true,
				response: "Category added successfully!",
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

const editCategory = async (req, res) => {
	try {
		const categoryFields = { ...req.params, ...req.body };
		const valid = validator.validate(editCategorySchema, categoryFields);
		if (valid.status) {
			const id = categoryFields.id;
			delete categoryFields.id;
			await categoryRepo.editCategory(id, categoryFields);
			return res.status(200).send({
				status: true,
				response: "Category edited successfully!",
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

const getACategory = async (req, res) => {
	try {
		const categoryFields = req.params;
		const valid = validator.validate(idSchema, categoryFields);
		if (valid.status) {
			const categoryData = await categoryRepo.getCategory(
				categoryFields.id
			);
			return res.status(200).send({
				status: true,
				response: categoryData,
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

const getAllCategories = async (req, res) => {
	try {
		const categoryData = await categoryRepo.getAllCategories();
		return res.status(200).send({
			status: true,
			response: categoryData,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};

module.exports = { addCategory, editCategory, getACategory, getAllCategories };
