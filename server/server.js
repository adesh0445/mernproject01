const express = require('express');
const myapp = express();
require('dotenv').config();
const cors = require('cors');

// ✅ Production mein dynamic CORS
myapp.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000"
}));

// ✅ Body parsers
myapp.use(express.json());
myapp.use(express.urlencoded({ extended: true }));

// ✅ Routes
const myrouting = require("./approuting/approute");
myapp.use(myrouting);

// ✅ Database connection
require("./database/mydb");

// ✅ Port from environment (Render inject karega)
const myport = process.env.PORT || 5000;
myapp.listen(myport, () => {
    console.log(`✅ Server Running On Port: ${myport}`);
});
