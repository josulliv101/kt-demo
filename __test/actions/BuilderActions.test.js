var BuilderActions = require("../../actions/BuilderActions.js");
var expect = require("chai").expect;
var sinon = require("sinon");
var reg = require("../../util/registry");
var Dispatcher = require("../../util/Dispatcher");

describe("BuilderActions", function() {
    
    var spy;
    
    beforeEach(() => {
        var dispatcher = new Dispatcher();
        reg.set("dispatcher", dispatcher);
        spy = sinon.spy(dispatcher, "resolve");
    });
    
    afterEach(() => {
        spy.restore(); 
    });

    it("dropping an existsing joiner should trigger a MOVE_JOINER event");

});
