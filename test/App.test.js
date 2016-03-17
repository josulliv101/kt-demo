import App from "../app/App";
import { Store, Dispatcher } from "../app/utils/registry";
import StateStore from "../app/stores/Store";
import { Dispatcher as BaseDispatcher } from "flux";
import { expect } from "chai";
import sinon from "sinon";

describe("App", () => {

    it("adds a new Store & Dispatcher to the registry.", () => {

        var app = new App();

        // Store() is shortcut for getting Store from registry
        expect(Store() instanceof StateStore).to.be.true;

        // Dispatcher() is shortcut for getting Dispatcher from registry
        expect(Dispatcher() instanceof BaseDispatcher).to.be.true;
    });

});
