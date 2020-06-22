const Product = require("../../db/models").Product;

const addProduct = async (data) => {
	try {
		await checkProductExistsByName(data.name);
		const productData = new Product(data);
		await productData.save();
	} catch (err) {
		throw err;
	}
};

const getProduct = async (id) => {
	try {
		const productData = await Product.findById(id).populate("categories");
		if (!productData)
			throw { status: 404, message: "Product is not found" };
		return productData;
	} catch (err) {
		throw err;
	}
};

const checkProductExistsByName = async (name) => {
	try {
		const productData = await Product.findOne({
			name: { $regex: name, $options: "i" },
		});
		if (productData)
			throw { status: 400, message: "Product already exists" };
		return productData;
	} catch (err) {
		throw err;
	}
};

const getAllProducts = async (active) => {
	try {
		let searchQuery = {};
		if (active) searchQuery = { active: true };
		const productData = await Product.find(searchQuery).populate(
			"categories"
		);
		return productData;
	} catch (err) {}
};

const editProduct = async (id, updateData) => {
	try {
		const productData = await getProduct(id);
		await Product.updateOne({ _id: id }, { $set: updateData });
	} catch (err) {
		throw err;
	}
};

module.exports = {
	addProduct,
	getAllProducts,
	getProduct,
	editProduct,
};
