var SurveyActions = require("../../actions/SurveyActions");
var sinon = require("sinon");
var expect = require("chai").expect;
var nock = require("nock");
var Dispatcher = require("../../util/Dispatcher");
var reg = require("../../util/registry");

describe("SurveyActions", function() {
    
    it("should rethrow INIT_SURVEY as a resolver", function() {
        var actions = new SurveyActions();
        var spy = sinon.spy();
        var fakeStore = {
            resolvers() {
                return { INIT_SURVEY: spy };
            }
        };
        var dispatcher = new Dispatcher();
        reg.set("dispatcher", dispatcher);
        dispatcher.register(fakeStore);
        dispatcher.register(actions);
        dispatcher.act("INIT_SURVEY", { survey: {} });
        expect(spy.callCount).to.equal(1);
    });
    
});
