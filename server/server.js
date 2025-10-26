const express = require('express');
const myapp = express();
require('dotenv').config();

const cors = require('cors');
myapp.use(cors({
    origin: "https://mernproject01-yrxf.onrender.com" // frontend ko backend se jodne ke liye
}));

// ✅ Body parser pehle aayega
myapp.use(express.json());
myapp.use(express.urlencoded({ extended: true }));

// ✅ Routing baad me
const myrouting = require("./approuting/approute");
myapp.use(myrouting);

// ✅ Database connection
require("./database/mydb");

const myport = process.env.PORT || 9900;
myapp.listen(myport, () => {
    console.log(`Server Running At http://localhost:${myport}`);
});