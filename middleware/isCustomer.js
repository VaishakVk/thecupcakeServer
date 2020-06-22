const constants = require("../constants");
module.exports = (req, res, next) => {
	if (
		req.userType == constants.userType.customer ||
		req.userType == constants.userType.admin
	)
		next();
	else next({ status: 403, message: "Forbidden" });
};
