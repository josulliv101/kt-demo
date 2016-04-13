import Store from '../../app/stores/Store';
import {CHANGE, FETCH, NOTIFY} from '../../app/actions/const';

const expect = require("chai").expect;
const sinon = require("sinon");

describe("StateStore", function() {
    
    var dispatcher;

    beforeEach(() => {
        dispatcher = { 
            register(fn) { this.fns = [fn]},
            dispatch(action) {this.fns && this.fns[0] && this.fns[0](action); }
        };
    });

    it("throws error if no dispatcher is supplied on initialization.", function() { 
        expect(() => new Store()).to.throw();
    });

    it("throws error when directly assigning a value to the store state attribute.", function() { 
        expect(() => new Store(dispatcher).state = {}).to.throw();
    });

    it("throws error when trying to access private (state modifying) functions.", function() { 
        var store = new Store(dispatcher);
        expect(() => store._merge({})).to.throw();
        expect(() => store['_merge']({})).to.throw();
        expect(() => store[_merge]({})).to.throw();
    });

    it("gets initialized with some default property stubs", function() { 

        var {auth, notifications, fetching} = new Store(dispatcher).state;
        
        expect(auth).to.be.null;
        expect(fetching).to.be.false;
        expect(notifications).to.be.empty;
    });

    it("adds/overrides properties on initialization", function() { 

        var custom = { auth: 'id-123456', foo: 'bar', notifications: [{}, {}]},
            {auth, notifications, foo} = new Store(dispatcher, custom).state;
        
        expect(auth).to.equal('id-123456');
        expect(notifications.length).to.equal(2);
        expect(foo).to.equal('bar');
    });

    it("registers actions with the dispatcher on initialization", function() { 

        var spy = sinon.spy(),
            store = new Store({register: spy});

        expect(spy.calledOnce).to.be.true;
    });

    it("points to the same structure object on multiple calls", function() { 
        var store = new Store(dispatcher);
        // Calling toJS() on structure makes it fail
        expect(store.structure).to.equal(store.structure);
    });

    it("points to a new structure when an action merge updates the store", function() { 

        var store = new Store(dispatcher);
        const orig = store.structure;
        
        expect(store.state.fetching).to.be.false;

        dispatcher.dispatch({actionType: FETCH.STATUS, update: true });
        
        expect(store.state.fetching).to.be.true;
        expect(orig).to.not.equal(store.structure);
    });

    it("points to a new structure when an action add updates the store", function() { 

        var store = new Store(dispatcher);
        const orig = store.structure;
        
        expect(store.state.notifications).to.be.empty;

        dispatcher.dispatch({actionType: NOTIFY.SHOW, update: {txt: 'helloworld'}});
        
        expect(store.state.notifications.length).to.equal(1);
        expect(orig).to.not.equal(store.structure);
    });

    it("uses the same structure when an action updates the store with dup data (no change)", function() { 

        var store = new Store(dispatcher);
        const orig = store.structure;
        
        expect(store.state.fetching).to.be.false;

        dispatcher.dispatch({actionType: FETCH.STATUS, update: false });
        
        expect(store.state.fetching).to.be.false;
        expect(orig).to.equal(store.structure);
    });

    it("gets the state given a certain path in the structure", function() { 

        var store = new Store(dispatcher, { foo: { bar: { baz: true }}});
        
        expect(store.state.foo.bar.baz).to.be.true;
        expect(store.stateAt(['foo', 'bar', 'baz'])).to.be.true;
    });

    it("gets the root state if no path given", function() { 

        var store = new Store(dispatcher, { foo: { bar: { baz: true }}});
        
        expect(store.stateAt().foo.bar.baz).to.be.true;
    });

});
