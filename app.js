require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");

const customerRoutes = require("./routes/customer");
const categoryAdminRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

const isAdmin = require("./middleware/isAdmin");
const isAuthenticated = require("./middleware/isAuthenticated");

app.use(morgan(":method :url :date[iso] :response-time ms"));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Methods",
		"GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
	);
	res.header("Access-Control-Expose-Headers", "Content-Length");
	res.header(
		"Access-Control-Allow-Headers",
		"Accept, Authorization, Content-Type, X-Requested-With, Range"
	);
	if (req.method === "OPTIONS") {
		return res.send(200);
	} else {
		return next();
	}
});

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/category", categoryAdminRoutes);
app.use("/api/v1/product", productRoutes);

app.use("/status", (req, res) => {
	return res.status(200).send({ status: true, message: "Server is up!" });
});
app.use((err, req, res, next) => {
	return res
		.status(err.status || 500)
		.send({ status: false, response: err.message || err });
});

module.exports = app;
