import reg from "../../app/utils/registry";
import {expect} from "chai";
import sinon from "sinon";

describe("Registry", function() {

    beforeEach(() => reg.clear());

    it("adds an item to the registry", function() {
        reg.set("Foo", () => {});
        reg.set("Bar", () => {});
        expect(reg.size()).to.equal(2);
    });

    it("retrieves an item from the registry", function() {
        const foo = () => {};
        reg.set("Foo", foo);
        expect( reg.get("Foo")() ).to.equal(foo);
    });

    it("clears all items from the registry", function() {
        reg.set("Foo", () => {});
        reg.set("Bar", () => {});
        expect(reg.size()).to.equal(2);
        reg.clear();
        expect(reg.size()).to.equal(0);
    });

    it("returns how many items are currently in the registry", function() {
        // Empty
        expect(reg.size()).to.equal(0);

        reg.set("Foo", () => {});
        expect(reg.size()).to.equal(1);

        reg.set("Bar", () => {});
        expect(reg.size()).to.equal(2);
    });
});
