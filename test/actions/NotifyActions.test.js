import {NotifyActions as Notify} from '../../app/actions';
import App from "../../app/App";
import {Store} from '../../app/utils/registry';
import { expect } from "chai";
import sinon from "sinon";

// Goal is to test if an action dispatch results in desired change to store state.
// A Store and Dispatcher are needed in registry -- new App() accomplishes this.

describe("Notify Actions", function() {
    
    it("adds a new notification to the store", function() {
        
        var app = new App();
        expect(Store().state.notifications).to.be.empty;

        Notify().show({ message: 'foo' });
		
		expect(Store().state.notifications.length).to.equal(1);
    });
	
	// This functionality will be converted to support multiple notifications
    it("limits the notifications list to a single notification at a time", function() {
        
        var app = new App();

        Notify().show({ message: 'foo' });
        Notify().show({ message: 'bar' });
		
		expect(Store().state.notifications.length).to.equal(1);
    });

    it("clears all notifications in the store", function() {
        
        var app = new App();

        Notify().show({ message: 'foo' });
        Notify().clear();

		expect(Store().state.notifications.length).to.equal(0);
    });

});
