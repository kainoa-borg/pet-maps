/**
 * @description Handles connection to atlas and mongodb
 */

import { MongoClient } from "mongodb";
import { errorMsg, debugMsg, logMsg, successMsg } from '../helpers/loggingTypes.mjs';
import { debugConsole } from "../helpers/debugger.mjs";

debugConsole();

// Get the connection string from our config
const connectionString = process.env.ATLAS_URI || "";

// Instantiate new client with our connection string
const client = new MongoClient(connectionString);

console.log("Connecting to Atlas...");
console.debug("connectionString = " + connectionString, 1);

let conn;
try {
    // Try connecting
    conn = await client.connect();
    console.success("Connected to atlas cluster", 1);
} catch(e) {
    // Log this error;
    console.error(e, 1);
}

console.log("Connecting to DB...");

let db;
try {
    // Connect to the db using name from the connection string
    db = conn.db("petmaps");
    console.success("Connected to db: " + db.databaseName, 1);
} catch(e) {
    console.error(e, 1);
    db = {}
}

export default db;