const Address = require("../../db/models/").Address;

const newAddress = async (addressFields) => {
	try {
		const addressSchema = new Address(addressFields);
		const addressData = await addressSchema.save();
		return addressData;
	} catch (err) {
		throw err;
	}
};

const getAddress = async (id) => {
	try {
		const addressData = await Address.findById(id);
		if (!addressData) throw { status: 404, message: "Address not found" };
		return addressData;
	} catch (err) {
		throw err;
	}
};
module.exports = { newAddress, getAddress };
