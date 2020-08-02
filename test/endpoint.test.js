let chai = require("chai");
let chaiHttp = require('chai-http');
let expect = chai.expect;
let should = chai.should;

let server = require('../src');


chai.use(chaiHttp);
describe("Test Endpoints", function() {
    it("server is live", function(done) {
        chai.request(baseUrl)
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});