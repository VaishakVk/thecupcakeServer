const Order = require("../../db/models").Order;
const productsRepo = require("../products/productRepo");
const addressRepo = require("../address/addressRepo");
const constants = require("../../constants");
const order = require("../../db/models/order");

const newOrder = async (orderData) => {
	try {
		const productIds = orderData.products.map(
			(product) => product.product_id
		);
		const { totalPrice, products } = await productsRepo.calculateTotalPrice(
			productIds,
			orderData.products
		);
		orderData.total_price = totalPrice;
		orderData.products = products;
		await addressRepo.getAddress(orderData.address);
		// console.log(orderData);
		const orderSchema = new Order(orderData);
		await orderSchema.save();
	} catch (err) {
		throw err;
	}
};

const getOrderById = async (id) => {
	try {
		const orderData = await Order.findById(id);
		if (!orderData) throw { status: 404, message: "Order does not exist" };
		return orderData;
	} catch (err) {
		throw err;
	}
};

const progressOrder = async (orderId) => {
	try {
		const orderData = await getOrderById(orderId);

		// Get the order of status
		const statusOrder = constants.orderStatus.order();
		if (!statusOrder) throw { message: "Internal Server Error" };

		// Get current status index and compare with the order of status
		const currentStatus = orderData.status;
		const currentStatusIndex = statusOrder.indexOf(currentStatus);

		// If it has reached DELIVERED then return
		if (currentStatusIndex == statusOrder.length - 1) return;

		const nextStatus = statusOrder[currentStatusIndex + 1];
		await Order.updateOne({ _id: orderId }, { status: nextStatus });
	} catch (err) {
		throw err;
	}
};

module.exports = { newOrder, progressOrder };
