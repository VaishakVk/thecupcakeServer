const express = require("express");
const router = express.Router();
const orderLib = require("../lib/order");
const isAuthenticated = require("../middleware/isAuthenticated");
const isAdmin = require("../middleware/isAdmin");
const isCustomer = require("../middleware/isCustomer");

router.post("/", isAuthenticated, isCustomer, orderLib.newOrder);
router.put("/progress/:id", isAuthenticated, orderLib.progressOrder);

module.exports = router;
