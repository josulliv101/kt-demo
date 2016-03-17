import {FetchActions as Fetch} from '../../app/actions';
import App from "../../app/App";
import {Store} from '../../app/utils/registry';
import { expect } from "chai";
import sinon from "sinon";

// Goal is to test if an action dispatch results in desired change to store state.
// A Store and Dispatcher are needed in registry -- new App() accomplishes this.

describe("Fetch Actions", function() {
    
    it("updates state with fetching status", function() {
        
        var app = new App();

        Fetch().status(true);
        expect(Store().state.fetching).to.be.true;

        Fetch().status(false);
        expect(Store().state.fetching).to.be.false;
    });

});
