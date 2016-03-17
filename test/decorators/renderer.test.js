import renderer from "../../app/decorators/renderer";
import {expect} from "chai";
import sinon from "sinon";

@renderer
class MyClass {}

describe("Renderer Decorator", function() {
	
	it("adds methods for rendering", function() { 
	  expect(MyClass.prototype.renderToDOM).to.exist;
	  expect(MyClass.prototype.renderToString).to.exist;
	});

	it("has access to the passed-in relay data", function() { 
	  const foo = new MyClass({relayData: ['foo', 'bar']});
	  expect(foo.relayData.length).to.equal(2);
	});

});
