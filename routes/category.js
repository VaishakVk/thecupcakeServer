const express = require("express");
const router = express.Router();
const categoryLib = require("../lib/category");
const isAuthenticated = require("../middleware/isAuthenticated");
const isAdmin = require("../middleware/isAdmin");

router.post("/", isAuthenticated, isAdmin, categoryLib.addCategory);
router.put("/edit/:id", isAuthenticated, isAdmin, categoryLib.editCategory);
router.get("/:id", categoryLib.getACategory);
router.get("/", categoryLib.getAllCategories);

module.exports = router;
