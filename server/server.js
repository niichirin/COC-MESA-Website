// Entry point of API server.
const express = require("express"); // API framework
const { connectDB } = require("./config/db"); // PostgreSQL db
const routes = require("./routes/api/queries"); // API endpoints
const cors = require("cors");
const bodyParser = require("body-parser"); // JSON

const app = express();

// allow browser to connect to external URLs
app.use(cors({ origin: true, credentials: true }));

// set up JSON parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect routes to server
app.use("/api/tutoring", routes);

// connect Database
connectDB();

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));