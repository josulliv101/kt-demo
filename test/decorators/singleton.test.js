import singleton from "../../app/decorators/singleton";
import {expect} from "chai";
import sinon from "sinon";

@singleton
class MyClass {}

describe("Singleton Decorator", function() {
	
	it("gets an instance of the decorated class", function() { 
	  expect(MyClass.getInstance).to.exist;
	  expect(MyClass.getInstance() instanceof MyClass).to.be.true;
	});

	it("returns the same instance for every getInstance call.", function() { 
	  var mc_1 = MyClass.getInstance(),
	  	  mc_2 = MyClass.getInstance();

	  expect(mc_1).to.equal(mc_2);
	});

});
