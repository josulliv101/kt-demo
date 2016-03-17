import DOM from "../../app/utils/DomUtils";
import {expect} from "chai";
import sinon from "sinon";

//require("../dom"); 

describe("DOM Utils", function() {

    it("gets a <script> element and parses its text into JSON", function() {

        var el = document.createElement('script');
        el.id = 'id-123';
        el.appendChild(document.createTextNode('{ "foo": "bar" }'));
        document.body.appendChild(el);

        expect(DOM.getData('id-123')).to.deep.equal({ foo: "bar" });
    });

});
