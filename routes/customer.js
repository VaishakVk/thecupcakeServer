const express = require("express");
const router = express.Router();
const customerLib = require("../lib/customer");
const isAuthenticated = require("../middleware/isAuthenticated");
const isCustomer = require("../middleware/isCustomer");

router.post("/signup", customerLib.signUp);
router.put(
	"/addAddress/:customerId",
	isAuthenticated,
	isCustomer,
	customerLib.addNewAddress
);
router.get("/login", customerLib.login);
router.get("/me", isAuthenticated, isCustomer, customerLib.getMyProfile);

module.exports = router;
