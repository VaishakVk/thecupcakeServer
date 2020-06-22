const express = require("express");
const router = express.Router();
const categoryLib = require("../lib/category");

router.post("/", categoryLib.addCategory);
router.put("/edit/:id", categoryLib.editCategory);
router.get("/:id", categoryLib.getACategory);
router.get("/", categoryLib.getAllCategories);

module.exports = router;
