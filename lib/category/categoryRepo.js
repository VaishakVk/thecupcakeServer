const Category = require("../../db/models").Category;
const addCategory = async (data) => {
	try {
		await checkCategoryExistsByName(data.name);
		const categoryData = new Category(data);
		await categoryData.save();
	} catch (err) {
		throw err;
	}
};

const getCategory = async (id) => {
	try {
		const categoryData = await Category.findById(id);
		if (!categoryData)
			throw { status: 404, message: "Category is not found" };
		return categoryData;
	} catch (err) {
		throw err;
	}
};

const checkCategoryExistsByName = async (name) => {
	try {
		const categoryData = await Category.findOne({
			name: { $regex: name, $options: "i" },
		});
		if (categoryData)
			throw { status: 400, message: "Category already exists" };
		return categoryData;
	} catch (err) {
		throw err;
	}
};

const getAllCategories = async (active) => {
	try {
		let searchQuery = {};
		if (active) searchQuery = { active: true };
		const categoryData = await Category.find(searchQuery);
		return categoryData;
	} catch (err) {}
};

const editCategory = async (id, updateData) => {
	try {
		await getCategory(id);
		await Category.updateOne({ _id: id }, { $set: updateData });
	} catch (err) {
		throw err;
	}
};

module.exports = {
	addCategory,
	getAllCategories,
	getCategory,
	editCategory,
};
