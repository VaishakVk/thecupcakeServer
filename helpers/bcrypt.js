const bcrypt = require("bcryptjs");

const comparePassword = async (plainText, hash) => {
	try {
		const valid = await bcrypt.compare(plainText, hash);
		if (!valid) throw { status: 400, message: "Passwords do not match" };
	} catch (err) {
		throw err;
	}
};

const hash = async (data) => {
	try {
		if (!data) throw "Data is required";
		const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
		const hashed = await bcrypt.hash(data, salt);
		return hashed;
	} catch (err) {
		throw err;
	}
};
module.exports = {
	comparePassword,
	hash,
};
