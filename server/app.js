const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mainRoute = require("./Routes/routes");
const cookiesParser = require("cookie-parser");
const path = require("path");
const { app, server } = require("./Socket/index");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookiesParser());

// Routes
app.use("/api", mainRoute);

// MongoDB Connection
const url = "mongodb://127.0.0.1:27017/chat_app";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Serving static files from the build folder
app.use(express.static(path.join(__dirname, "build")));

// Handling all other requests by serving the index.html from the build folder
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
const db = mongoose.connection;
db.on("open", () => {
  console.log("Connected to MongoDB...");
});

// Starting the server
const PORT = process.env.PORT || 2000;
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
