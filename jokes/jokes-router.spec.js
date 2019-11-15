const request = require('supertest');
const server = require("../api/server");
const db = require('../database/dbConfig.js');

describe("GEt/", () =>{
    const url = "/api/jokes";

    it ("should return 400 status code", () =>{

        return request(server)
            .get(url)
            .then(response => expect(response.status).toBe(400));
    });
    // it("should return with JSON", () => {
    //     return request(server)
    //         .get(url)
    //         .then(res => expect(res.status).toBe(/json/));
    // });

    
    
})