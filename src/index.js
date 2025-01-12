import express from "express"
import { connect } from "mongoose";
import connectDB from "./db/index.js";
import { config } from "dotenv"
import { app } from "./app.js";

config()

let port = process.env.PORT || 8000;
 
const startServer = async () => {
    try {
      await connectDB();
      const server = await app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
      
      // Handle unexpected errors
      server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.error(`Port ${port} is already in use.`);
          process.exit(1);
        } else {
          console.error("Server error:", err);
        }
      });
    } catch (err) {
      console.error("Error starting server:", err);
      process.exit(1);
    }
  };
  
  setTimeout(()=>   startServer(), 4000);