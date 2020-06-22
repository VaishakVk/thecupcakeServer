const hasToken = require("../helpers/jwt").hasToken;
const constants = require("../constants");
const customerRepo = require("../lib/customer/customerRepo");
module.exports = async (req, res, next) => {
	try {
		let user;
		const payload = hasToken(req);
		if (!payload) next({ status: 401, message: "Invalid token" });
		if (payload.userType == constants.userType.customer) {
			user = await customerRepo.getCustomerProfileByEmail(payload.email);
		}
		if (!user) next({ status: 401, message: "Invalid user" });
		else {
			req.user = user;
			req.userType = payload.userType;
		}
		next();
	} catch (err) {
		console.log(err);
		return next(err);
	}
};
