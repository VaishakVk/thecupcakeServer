const constants = require("../../constants");
const userSchema = {
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	account_status: {
		type: String,
		required: true,
		enum: [
			constants.account_status.approved,
			constants.account_status.suspended,
			constants.account_status.rejected,
			constants.account_status.unverified,
		],
		default: constants.account_status.approved,
	},
	profile_photo: {
		type: String,
	},
	gender: {
		type: String,
		enum: [constants.gender.male, constants.gender.female],
	},
	date_of_birth: {
		type: Date,
		required: true,
	},
	contact_number: {
		type: String,
		required: true,
	},
};

module.exports = userSchema;
