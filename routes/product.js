const express = require("express");
const router = express.Router();
const productLib = require("../lib/products");

router.post("/", productLib.addProduct);
router.put("/edit/:id", productLib.editProduct);
router.get("/:id", productLib.getAProduct);
router.get("/", productLib.getAllProducts);

module.exports = router;
