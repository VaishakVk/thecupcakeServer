const express = require("express");
const router = express.Router();
const customerLib = require("../lib/customer");
const isAuthenticated = require("../middleware/isAuthenticated");
const isCustomer = require("../middleware/isCustomer");

router.post("/signup", customerLib.signUp);
router.put(
	"/addAddress/",
	isAuthenticated,
	isCustomer,
	customerLib.addNewAddress
);
router.put("/addCart/", isAuthenticated, isCustomer, customerLib.addToCart);
router.put(
	"/removeCart/",
	isAuthenticated,
	isCustomer,
	customerLib.removeFromCart
);
router.get("/login", customerLib.login);
router.get("/me", isAuthenticated, isCustomer, customerLib.getMyProfile);

module.exports = router;
