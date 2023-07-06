import { handlePFToken, getPFAuthToken } from "../helpers/tokens.mjs";
import { expect } from "chai";

describe(">Test token functions", () => {
    let result;
    describe("--token handler", () => {
        const response = {
            data: {
                token_type: "Bearer",
                expires_in: "3600",
            }
        }
        let token;
        it ("should return a token", () => {
            token = handlePFToken(response);
            expect(token);
            expect(token.token_type);
        })
        it ("should have a valid expire dateTime", () => {
            expect(token.expireDateTime);
            expect(typeof(token.expireDateTime)).to.equal('string');
        })
    })
    describe("--getPFAuthToken return check", () => {
        it ("returns an object", async () => {
            result = await getPFAuthToken();
            expect(typeof(result)).to.equal('object');
        })
        it ("should have token_type as Bearer", () => {
            expect(result?.token_type).to.equal("Bearer");
        })
        it ("should remember the last token", async () => {
            let newResult = await getPFAuthToken();
            expect(newResult.expireDateTime).to.equal(result.expireDateTime);
        })
    })
})