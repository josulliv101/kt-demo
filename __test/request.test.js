require("../dom");
var request = require("../../util/request");
var expect = require("chai").expect;
var nock = require("nock");

describe("request", function() {
    
    afterEach(function() {
        nock.cleanAll();
    });
    
    var testCrsfTokenData = function(method, nockMethod) {
        it(method + " request will have CSRF_TOKEN in url", function(done) {                
            nock("http://localhost")[nockMethod]("/test?CSRFTOKEN=1234")
                .reply(200, function(uri) {
                    done();
                });

            document.cookie = "CSRFTOKEN=1234";
            request[method]("http://localhost/test").send({ foo: "bar" }).end();
        });   
    };
    
    testCrsfTokenData("put", "put");
    testCrsfTokenData("post", "post");
    testCrsfTokenData("del", "delete");
    
});
