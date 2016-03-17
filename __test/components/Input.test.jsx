require("../dom");
var expect = require("chai").expect;
var React = require("react/addons");
var TestUtils = React.addons.TestUtils;
var Input = require("../../components/Input.jsx");
var reg = require("../../util/registry");

describe("Input", function() {

    it("renders a label if provided", function() {
        var markup = React.renderToStaticMarkup(
            <Input id="TEST" label="foo" />
        );
        
        expect(markup).to.equal('<div class="pure-control-group"><label for="TEST">foo</label><input id="TEST"></div>');
    });
    
});
