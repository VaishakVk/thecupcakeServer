const Customer = require("../../db/models").Customer;
const userRepo = require("../user/userRepo");
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
		return userData;
	} catch (err) {
		throw err;
	}
};

module.exports = {
	signup,
	login,
	getCustomerProfileByEmail,
	getCustomerProfileById,
};
