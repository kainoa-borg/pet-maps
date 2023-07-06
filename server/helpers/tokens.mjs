import axios from 'axios';
import { debugMsg, errorMsg, logMsg, successMsg } from './loggingTypes.mjs';
import { debugConsole } from './debugger.mjs';
import { assert } from 'chai';

var token;
var tokenTime;

debugConsole();

export const handlePFToken = (response) => {
    let token;
    try {
        token = response.data;
        assert(token.token_type);
    } catch(e) {
        console.error("Invalid response");
    }

    // Set the time we got this token
    tokenTime = new Date().getTime() / 1000;
    // Calculate the time it will expire
    let tokenExpireSeconds = tokenTime + token.expires_in;
    // Create expiration date time string
    let tokenExpireDate = new Date(tokenExpireSeconds * 1000);
    let tokenExpireDateTime = tokenExpireDate.toLocaleString() + ", HST";

    token.expireDateTime = tokenExpireDateTime;

    if (token) {
        // Success message with expire date
        if (token?.token_type) {
            console.success("Got new token!", 3);
        }
        else {
            console.error("Could not get token from PetFinder API", 3);
        }
    }

    return token;
}

const requestPFAuthToken = async () => {

    // Build request body using API key and secret
    let requestBody = "grant_type=client_credentials" +
    "&client_id=" + process.env.PET_FINDER_API_KEY +
    "&client_secret=" + process.env.PET_FINDER_SECRET;

    // What does the request body look like
    console.debug(requestBody, 3);

    // Make request for new token
    let response;
    try {
        response = await axios.post("https://api.petfinder.com/v2/oauth2/token", requestBody)
    } catch(e) {
        console.error(e, 2);
    }

    // Get the token from this response
    token = handlePFToken(response);
}

export const getPFAuthToken = async () => {
    console.log("Looking for token...", 1);

    // console.debug(debugMsg("Date seconds now: " + Date.now() / 1000, 1));
    // console.debug(debugMsg("Expire seconds: " + tokenTime, 1));
    // console.debug(debugMsg("Elapsed seconds: " + (Date.now()/1000 - tokenTime), 1));

    // If we don't have a token, get a new one
    if (!token) {
        console.log("No token found, requesting new token", 2);
        await requestPFAuthToken();
    }
    // If the token is expired, get a new one
    else if (Date.now() / 1000 - tokenTime > 3600) {
        console.log("Token has expired, requesting new token", 2);
        await requestPFAuthToken();
    }
    // return the token
    if (token) {
        console.log("Returning token...", 2);
    }
    else {
        console.error("Failed to get token from PetFinder API", 2);
    }
    return token;
}
