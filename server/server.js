const express = require('express');
const myapp = express();
require('dotenv').config();
const cors = require('cors');
const path = require('path');

// ✅ Dynamic CORS (frontend URL environment se le raha)
myapp.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000"
}));

// ✅ Body parsers
myapp.use(express.json());
myapp.use(express.urlencoded({ extended: true }));

// ✅ Database connection
require("./database/mydb");

// ✅ Routes
const myrouting = require("./approuting/approute");
myapp.use(myrouting);

// ✅ React build serve karna (for production)
const clientBuildPath = path.join(__dirname, "../client/build");
myapp.use(express.static(clientBuildPath));

// ✅ Catch-all route (refresh fix)
myapp.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// ✅ Server start
const myport = process.env.PORT || 5000;
myapp.listen(myport, () => {
  console.log(`✅ Server Running On Port: ${myport}`);
});
