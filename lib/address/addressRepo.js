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

module.exports = { newAddress };
