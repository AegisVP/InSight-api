const express = require("express");
const app = express();
const PORT = process.env.PORT || 8088;

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_vlad.json");

app.use(
	"/api-docs-vlad",
	swaggerUi.serveFiles(swaggerDocument, {
		swaggerOptions: {
			url: "/api-docs-vlad/swagger.json",
		},
	}),
	swaggerUi.setup(swaggerDocument)
);

try {
	app.listen(PORT, () => {
		console.log(`Server running. Use our API on port: ${PORT}`);
	});
} catch (error) {
	console.error("Error:", error.message);
	process.exit(1);
}
