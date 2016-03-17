require("../dom");
var expect = require("chai").expect;
var React = require("react/addons");
var TestUtils = React.addons.TestUtils;
var Text = require("../../components/Text.jsx");
var MessageStore = require("../../stores/MessageStore");
var reg = require("../../util/registry");

describe("Text", function() {

    before(function() {
        reg.set("messageStore", MessageStore);
    });
    
    afterEach(function() {
        // Clean up the MessageStore.
        var options = { type: "ui", locale: "en_US" };
        MessageStore.populate(options, null);
    });

    it("component can take arguments", function() {
        var options = { type: "ui", locale: "en_US" };
        MessageStore.populate(options, { TEST_KEY: "{1} vs. {0}" });
        MessageStore.configure(options);
        
        var markup = React.renderToStaticMarkup(
            <Text id="TEST_KEY" args={["foo", "bar"]} />
        );
        
        expect(markup).to.equal("<span>bar vs. foo</span>");
    });
    
    it("component renders an empty span if message id is undefined", function() {
        var options = { type: "ui", locale: "en_US" };
        MessageStore.configure(options);
        
        var markup = React.renderToStaticMarkup(
            <Text id="TEST_KEY" />
        );
        
        expect(markup).to.equal("<span></span>");
    });
    
});
