import {EventEmitter} from 'events';
import {CHANGE, SYMBOL} from '../actions/const';
import Immutable from 'immutable'; //import Cursor from 'immutable/contrib/cursor';
import actionHandler from '../decorators/actionHandler';

// Symbol variables will have '$$'' prefix
const $$store = Symbol(SYMBOL.STORE);

@actionHandler($$store)
class Store extends EventEmitter {
  
  static defaultState = { auth: null, fetching: false, notifications: [] };

  constructor (dispatcher, state = {}) { 
    
    super();

    if (!dispatcher) throw new Error('A store dispatcher is required.');

    // Init the store with defaults and default overrides,
    this[$$store] = Immutable.fromJS( Object.assign({}, Store.defaultState, state) );
    
    // Register a function that updates Store state based on incoming actions.
    if (this.handleAction) {
      dispatcher.register(this.handleAction.bind(this));
    }
  }
  

  //// Events ////

  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }
 
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }  
  

  //// Utils ////
  
  // Get state at a specific cursor path
  stateAt(path = []) {
    const val = this.structure.getIn(path);
    return typeof val !== 'object' ? val : val.toJS();
  }


  //// Getters/Setters ////
  
  // The Immutable data structure
  get structure() { // No setter intentional
    return this[$$store];
  }
  
  // JSON dump of the data structure
  get state() { // No setter intentional
    return this[$$store].toJS();
  }

}

export default Store
