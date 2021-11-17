const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// initial endpoint
app.get("/", (req, res) => res.send("API Up & Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/questions", require("./routes/api/questions"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));