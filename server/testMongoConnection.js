// testMongoConnection.js
import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI || process.env.MYDATAPATH;

// 1️⃣ DNS test
console.log("🔍 Testing DNS resolution for MongoDB Atlas...");
dns.resolveSrv("_mongodb._tcp.cluster0.9woi8ld.mongodb.net", (err, addresses) => {
  if (err) {
    console.error("❌ DNS resolution failed:", err.message);
  } else {
    console.log("✅ DNS resolved successfully:");
    console.log(addresses);
  }

  // 2️⃣ MongoDB Connection test
  console.log("\n🔌 Testing MongoDB connection...");
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("✅ MongoDB connection established successfully!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed!");
    console.error("Error message:", err.message);
  });
});
