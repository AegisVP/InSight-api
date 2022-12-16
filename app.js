const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const authRouter = require("./auth/authRouter");

const app = express();

app.use(logger(app.get("env") === "development" ? "dev" : "short"));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve);
app.use("/api-docs", swaggerUi.setup(swaggerDocument), swaggerUi.serve);

app.use("/auth", authRouter);

app.get("/", function (req, res) {
	res.send("API up");
});

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

module.exports = { app };
