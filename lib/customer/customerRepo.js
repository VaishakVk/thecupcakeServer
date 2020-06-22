const Customer = require("../../db/models").Customer;
const userRepo = require("../user/userRepo");
const addressRepo = require("../address/addressRepo");
const constants = require("../../constants");
const signup = async (data) => {
	try {
		await userRepo.userSignup(Customer, data);
	} catch (err) {
		throw err;
	}
};

const login = async (data, password) => {
	try {
		// console.log(data, password);
		const token = await userRepo.userLogin(
			Customer,
			data,
			password,
			constants.userType.customer
		);
		return token;
	} catch (err) {
		throw err;
	}
};

const getCustomerProfileByEmail = async (email) => {
	try {
		const userData = await userRepo.getUserByEmail(Customer, email);
		return userData;
	} catch (err) {
		throw err;
	}
};

const getCustomerProfileById = async (id) => {
	try {
		const userData = await userRepo.getUserById(Customer, id);
		if (!userData)
			throw { status: 404, message: "Customer does not exist" };
		return userData;
	} catch (err) {
		throw err;
	}
};

const addAdress = async (customerId, addressData) => {
	try {
		const addressRes = await addressRepo.newAddress(addressData);
		await Customer.updateOne(
			{
				_id: customerId,
			},
			{ $addToSet: { stored_adresses: addressRes._id } }
		);
	} catch (err) {
		throw err;
	}
};

const removeFromCart = async (customerId, productId) => {
	try {
		await Customer.update(
			{
				_id: customerId,
			},
			{ $pull: { cart: { product_id: productId } } }
		);
	} catch (err) {
		throw err;
	}
};

const addToCart = async (customerId, productId, quantity) => {
	try {
		await removeFromCart(customerId, productId);
		await Customer.update(
			{
				_id: customerId,
			},
			{ $push: { cart: { product_id: productId, quantity } } }
		);
	} catch (err) {
		throw err;
	}
};

const emptyCart = async (customerId) => {
	try {
		await Customer.update(
			{
				_id: customerId,
			},
			{ cart: [] }
		);
	} catch (err) {
		throw err;
	}
};

module.exports = {
	signup,
	login,
	getCustomerProfileByEmail,
	getCustomerProfileById,
	addAdress,
	addToCart,
	removeFromCart,
	emptyCart,
};
