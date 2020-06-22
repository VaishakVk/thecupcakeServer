const mongoose = require("mongoose");
module.exports = async () => {
	return new Promise((resolve, reject) => {
		try {
			mongoose.connect(
				process.env.MONGO_URL,
				{ useNewUrlParser: true, useUnifiedTopology: true },
				(err) => {
					if (err) {
						console.log(`Error connecting to Database: ${err}`);
						process.exit(1);
					} else {
						console.log("Connected to Database...");
						resolve();
					}
				}
			);
		} catch (err) {
			console.log(`Error connecting to Database: ${err}`);
			process.exit(1);
		}
	});
};
