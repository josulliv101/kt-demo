import storeListener from "../../../app/decorators/components/storeListener";
import {CHANGE} from '../../../app/actions/const';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Store from '../../../app/stores/Store';
import {expect} from "chai";
import sinon from "sinon";
import TestUtils from "react-addons-test-utils";

class Base extends Component {
	render() { return <noscript/> }
}

describe("Store Listener Decorator", function() {
	
	var store, dispatcher;

    beforeEach(() => {

    	// TODO: fix these attrs from persisting
    	Store.defaultState = Object.assign({}, Store.defaultState, { foo: 'bar', baz: 'bah' });
    	dispatcher = { register() {} };
		store = new Store(dispatcher, {});
    });

	it("populates the state with ALL the store values by default", function() { 
		
		var WrappedComponent = storeListener(() => store)(Base),
			component = TestUtils.renderIntoDocument(<WrappedComponent/>);
		
		expect(component.state.foo).to.equal('bar');
		expect(component.state.baz).to.equal('bah');
	});

	it("populates the state with ONLY the specified store values when ids are passed-in", function() { 
		
		var WrappedComponent = storeListener(() => store, 'foo')(Base),
			component = TestUtils.renderIntoDocument(<WrappedComponent/>);
		
		expect(component.state.foo).to.equal('bar');
		expect(component.state.baz).to.not.exist;
	});

	it("listens for state change from store", function() { 
		
		var WrappedComponent = storeListener(() => store)(Base),
			stub = sinon.stub(WrappedComponent.prototype, "onChange"),
			component = TestUtils.renderIntoDocument(<WrappedComponent/>);
		
		expect(store.listenerCount(CHANGE)).to.equal(1);

		store.emit(CHANGE, {});
		store.emit(CHANGE, {});

		expect(stub.calledTwice).to.be.true;

	});

	it("removes event listener on componentWillUnmount", function() { 
		
		var WrappedComponent = storeListener(() => store)(Base),
			component = TestUtils.renderIntoDocument(<WrappedComponent/>);

		component.componentWillUnmount();

		expect(store.listenerCount(CHANGE)).to.equal(0);

	});

});
