import actionHandler from "../../app/decorators/actionHandler";
import {FETCH, FETCH2, NOTIFY2, ACTION} from '../../app/actions/const';
import Immutable from 'immutable';
import {expect} from "chai";
import sinon from "sinon";

const $$mockStore = Symbol('mock.store');

describe("Action Handler Decorator", function() {
	
	describe("Updates", function() {

		it("has a 'handleAction' function", function() { 
		  	expect(MockStore.prototype.handleAction).to.exist;
		});

		it("sets <Boolean> data into the structure", function() { 
			const store = new MockStore();
			store.handleAction({ actionType: FETCH2.STATUS, update: true });
		  	expect(store.structure.toJS().fetching).to.be.true;
		});

		it("sets <String> data into the structure", function() { 
			const store = new MockStore();
		  	store.handleAction({ actionType: FETCH2.STATUS, update: 'foo' });
		  	expect(store.structure.toJS().fetching).to.equal('foo');
		});

		it("sets <Array> data into the structure", function() { 
			const store = new MockStore();
		  	store.handleAction({ actionType: FETCH2.STATUS, update: [1,2,3] });
		  	expect(store.structure.toJS().fetching.length).to.equal(3);
		});

		it("sets <Object> data into the structure", function() { 
			const store = new MockStore();
		  	store.handleAction({ actionType: FETCH2.STATUS, update:  { foo: 'bar' }});
		  	expect(store.structure.toJS().fetching.foo).to.equal('bar');
		});

	});

	describe("Lists", function() {

		it("adds a new list item into the structure", function() { 
			const store = new MockStore();
			store.handleAction({ actionType: NOTIFY2.SHOW, update: { foo: 'bar' }});
			store.handleAction({ actionType: NOTIFY2.SHOW, update: { foo: 'baz' }});
		  	expect(store.structure.toJS().notifications.length).to.equal(2);
		});

		it("empties a list", function() { 
			const store = new MockStore();
			store.handleAction({ actionType: NOTIFY2.SHOW, update: { foo: 'bar' }});
		  	expect(store.structure.toJS().notifications.length).to.equal(1);

		  	store.handleAction({ actionType: NOTIFY2.CLEAR, update: null });
		  	expect(store.structure.toJS().notifications.length).to.equal(0);
		});

	});

	describe("General", function() {

		it("can override the default store action if needed (set, merge, add, clear)", function() { 
			const store = new MockStore();

			var copySTATUS = Object.assign({}, FETCH2.STATUS);
			copySTATUS.type = ACTION.TYPE.MERGE;
			
			store.handleAction({ actionType: copySTATUS, update: { foo: 'bar' }});
		  	expect(store.structure.toJS().fetching).to.deep.equal({foo: 'bar'});
			
			// Merge
		  	store.handleAction({ actionType: copySTATUS, update: { baz: 'bah' }});
		  	expect(store.structure.toJS().fetching).to.deep.equal({foo: 'bar', baz: 'bah'});

		  	// Set replaces everything, no merge.
		  	store.handleAction({ actionType: FETCH2.STATUS, update: { bar: 'foo' }});
		  	expect(store.structure.toJS().fetching).to.deep.equal({bar: 'foo'});
		});

		it("throws an error if the action type does not match a store modifier", function() { 
			const store = new MockStore();

			var copySTATUS = Object.assign({}, FETCH2.STATUS);
			copySTATUS.type = 'action_does_not_exist';
			
		  	expect(() => store.handleAction({ actionType: copySTATUS, update: { foo: 'bar' }})).to.throw();
		});



	});

});

@actionHandler($$mockStore)
class MockStore {

	constructor() {
		this[$$mockStore] = Immutable.fromJS({ notifications: [] });
		if (this.handleAction) this.handleAction = this.handleAction.bind(this);
	}
	
	get structure() {
		return this[$$mockStore];
	}
}
