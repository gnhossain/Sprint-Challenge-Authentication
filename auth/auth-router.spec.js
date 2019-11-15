const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

describe("POST/register", () =>{
    const url = "/api/auth/register";
    beforeEach(async() => {
        await db ("users").truncate();
    });

    it ("should return 201 status code", () =>{
        const user = {
            username: "aUser",
            password: "pass"
        };

        return request(server)
            .post(url)
            .send(user)
            .then(response => expect(response.status).toBe(201));
    });
    it("should return 500 status code", () => {
        return request(server)
            .post(url)
            .then(res => expect(res.status).toBe(500));
    });

    describe("POST /login", () => {
        const url = "/api/auth/login";
        it("should return a 401 status code", () => {
            const user = {
                username: "aUser",
                password: "pass"
            };
            return request(server)
                .post(url)
                .send(user)
                .then(res => expect(res.status).toBe(401))
        })
        it("should return 500 status code", () => {
            return request(server)
                .post(url)
                .then(res => expect(res.status).toBe(500));
        });
    })
})