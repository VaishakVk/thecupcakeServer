const bcryptHelper = require("../../helpers/bcrypt");
const jwtHelper = require("../../helpers/jwt");

const getUserDetails = async (Model, email, contactNumber) => {
	try {
		userData = await Model.findOne({
			$or: [
				{ email: { $regex: email, $options: "i" } },
				{ contact_number: contactNumber },
			],
		});
		return userData;
	} catch (err) {
		throw err;
	}
};

const getUserByEmail = async (Model, email) => {
	try {
		userData = await Model.findOne({
			email: { $regex: email, $options: "i" },
		}).select({ password: 0 });
		if (!userData) throw { status: 404, message: "User does not exist" };
		return userData;
	} catch (err) {
		throw err;
	}
};
const getUserById = async (Model, id) => {
	try {
		userData = await Model.findById(id).select({ password: 0 });
		if (!userData) throw { status: 404, message: "User does not exist" };
		return userData;
	} catch (err) {
		throw err;
	}
};

const userSignup = async (Model, data) => {
	try {
		const userDetails = await getUserDetails(
			Model,
			data.email,
			data.contact_number
		);
		if (userDetails) {
			if (userData.email == data.email)
				throw { status: 400, message: "Email is already registered" };
			if (userData.contact_number == data.contact_number)
				throw {
					status: 400,
					message: "Contact Number is already registered",
				};
		}
		const hashedPassword = await bcryptHelper.hash(data.password);
		data.password = hashedPassword;
		const userData = new Model(data);
		await userData.save();
	} catch (err) {
		throw err;
	}
};

const userLogin = async (Model, data, password, userType) => {
	try {
		const userData = await getUserDetails(Model, data, data);
		await bcryptHelper.comparePassword(password, userData.password);
		const payload = { email: userData.email, userType };
		const token = jwtHelper.sign(payload);
		return token;
	} catch (err) {
		throw err;
	}
};
module.exports = { userSignup, userLogin, getUserByEmail, getUserById };
