var messages = require("../messages");
var expect = require("chai").expect;
var sinon = require("sinon");
var properties = require("properties");
var MessageStore = require("../stores/MessageStore");

describe("Messages", function() {
    
    after(function() {
        // Clean up the MessageStore.
        var options = { type: "ui", locale: "en_US" };
        MessageStore.populate(options, null);
    });
    
    it("can load messages from properties into store", function(done) {
        // Mock property parsing so that it doesn't actually load from the file system.
        sinon.stub(properties, "parse", function(path, options, callback) {
            callback(null, { TEST_KEY: "Foobar" });
        });
        
        var options = { type: "ui", locale: "en_US" };
        messages.load(options, function(error, store) {
            store.configure(options);
            expect(store.get("TEST_KEY")).to.equal("Foobar");
            done();
        });
    });
    
});
