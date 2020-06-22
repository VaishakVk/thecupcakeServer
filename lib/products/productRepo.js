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
		await getProduct(id);
		await Product.updateOne({ _id: id }, { $set: updateData });
	} catch (err) {
		throw err;
	}
};

const addCategoriesToProduct = async (productId, categoryIds) => {
	try {
		await getProduct(productId);
		await Product.updateOne(
			{ _id: productId },
			{ $addToSet: { categories: categoryIds } }
		);
	} catch (err) {
		throw err;
	}
};

const checkProductsExists = async (productIds) => {
	try {
		if (typeof productIds == "string") productIds = [productIds];
		const uniqueIds = [...new Set(productIds)];
		const productData = await Product.find({
			_id: { $in: uniqueIds },
		});
		if (productIds.length != uniqueIds.length)
			throw { status: 404, message: "Some of the products do not exist" };
		return productData;
	} catch (err) {
		throw err;
	}
};

const calculateTotalPrice = async (productIds, products) => {
	try {
		// console.log(products, productIds);
		const productData = await checkProductsExists(productIds);
		// console.log("Start", productData);

		// Convert productData Array to hashmap of productId and price
		const productPriceMap = {};
		productData.forEach((product) => {
			productPriceMap[product._id] = product.price_per_uom;
		});

		// console.log("Map, ", productPriceMap);

		// Calculate Total Order Price
		let totalPrice = 0;
		products.map((product) => {
			totalPrice +=
				productPriceMap[product.product_id] * product.quantity;
			product.price = productPriceMap[product.product_id];
			return product;
		});
		// console.log("End", products, totalPrice);
		return { totalPrice, products };
	} catch (err) {
		throw err;
	}
};
module.exports = {
	addProduct,
	checkProductsExists,
	getAllProducts,
	getProduct,
	editProduct,
	addCategoriesToProduct,
	calculateTotalPrice,
};
