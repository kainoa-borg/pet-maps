import express from "express";
import db from '../db/conn.mjs';
import { ObjectId } from "mongodb";
import { debugMsg, errorMsg, logMsg, successMsg } from "../helpers/loggingTypes.mjs";
import { getPFAuthToken } from "../helpers/tokens.mjs"
import { debugConsole } from "../helpers/debugger.mjs";
import axios from 'axios';

debugConsole();

const router = express.Router();

router.get('/', async (req, res) => {
    console.log("Receiving / request...");
    let token = await getPFAuthToken();

    if (!token) {
        console.error(("Failed to authenticate!"));
        return res.status(400).send("Failed to authenticate!");
    }

    console.success("Authenticated until: " + token.expireDateTime, 1);
    return res.status(200).send("Authenticated until: " + token.expireDateTime);
});

router.get('/PF_API', async (req, res) => {

    console.log("Receiving /PF_API request...");
    let token = await getPFAuthToken();

    if (!token) {
        console.error("Failed to authenticate!");
        return res.status(400).send("Failed to Authenticate!");
    }

    console.log("Retrieving PF_API data...", 1)

    let data = {};
    let response;

    try {
        response = await axios.get("https://api.petfinder.com/v2/" + req.query.endpoint, {
            headers: {
                Authorization: "Bearer " + token.access_token
            },
            params: req.query,
        })
    } catch(e) {
        console.error(e, 1);
        return res.status(400).send(e.response);
    }

    console.success("Retrieved data!", 2)

    data = response.data;
    data['queryParams'] = req.query;

    console.success("Responding with data!");

    return res.status(200).send(data);
});

export default router;