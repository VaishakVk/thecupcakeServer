const express = require("express");
const router = express.Router();
const productLib = require("../lib/products");
const isAuthenticated = require("../middleware/isAuthenticated");
const isAdmin = require("../middleware/isAdmin");

router.post("/", isAuthenticated, isAdmin, productLib.addProduct);
router.put("/edit/:id", isAuthenticated, isAdmin, productLib.editProduct);
router.get("/:id", productLib.getAProduct);
router.get("/", productLib.getAllProducts);
router.put(
	"/add-category",
	isAuthenticated,
	isAdmin,
	productLib.addCategoryToProduct
);

module.exports = router;
