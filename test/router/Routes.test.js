const {routes} = require("../../app/router/");
const expect = require("chai").expect;
const sinon = require("sinon");

describe("Routes", function() {

    it("returns a function used to retrieve an array of routes", function() { 
        expect(routes).to.be.a('function');
        expect(routes()).to.be.an('array');
    });

});
