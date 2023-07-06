import { expect } from "chai";
import axios from 'axios';

describe(">API routes test", () => {
    describe("--/animals GET", () => {
        let reqConfig = {
            params: {
                endpoint: "/animals",
                breed: "samoyed"
            }
        }
        let locationReqConfig = {
            params: {
                endpoint: "/animals",
                location: "Denver, CO",
                distance: "10"
            }
        }
        let response;
        it("resolves", async () => {
            await axios.get(process.env.API_URL + "/PF_API", reqConfig);
        })
        it("receives query params", async () => {
            response = await axios.get(process.env.API_URL + "/PF_API", reqConfig);
            expect(response?.data?.queryParams?.endpoint).to.equal("/animals")
            expect(response?.data?.queryParams?.breed).to.equal("samoyed")
        })
        it("receives and responds with animal data", async () => {
            expect(response?.data?.animals?.length).to.be.greaterThan(0);
        })
        it("receives and responds with organization data", async () => {
            response = await axios.get(process.env.API_URL + "/PF_API", locationReqConfig);
            expect(response?.data?.animals?.length).to.be.greaterThan(0);
        })
    })
})