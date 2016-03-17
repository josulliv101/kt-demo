var SurveyListActions = require("../../actions/SurveyListActions");
var sinon = require("sinon");
var expect = require("chai").expect;
var nock = require("nock");
var Dispatcher = require("../../util/Dispatcher");
var reg = require("../../util/registry");

describe("SurveyListActions", function() {
    
    it("should rethrow INIT_ALL_SURVEYS as a resolver", function() {
        var actions = new SurveyListActions();
        var spy = sinon.spy();
        var fakeStore = {
            resolvers() {
                return { INIT_ALL_SURVEYS: spy };
            }
        };
        var dispatcher = new Dispatcher();
        reg.set("dispatcher", dispatcher);
        dispatcher.register(fakeStore);
        dispatcher.register(actions);
        dispatcher.act("INIT_ALL_SURVEYS", { surveys: [] });
        expect(spy.callCount).to.equal(0);
    });
    
});
