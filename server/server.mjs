/**
 * @description Runs ExpressJS server using configuration and db connection
 */

import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import record from "./routes/record.mjs";
import { debugMsg, logMsg, successMsg } from "./helpers/loggingTypes.mjs";
import { debugConsole } from "./helpers/debugger.mjs";

debugConsole();

// Define the port for this server
const PORT = process.env.PORT || 5050;
// Initialize app to use express
const app = express();

// Use cors headers
app.use(cors({
    origin: true,
    credentials: true
}));
// This app handles JSON
app.use(express.json());

// Main API route
app.use("/api", record);

console.log("Starting server...");

app.listen(PORT, () => {
    console.success("Running on port " + PORT, 1);
})