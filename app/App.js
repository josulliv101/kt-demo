import {Dispatcher} from 'flux';
import Store from './stores/Store';
import {REGISTRY as REG} from './actions/const';
import renderer from './decorators/renderer';
import reg from './utils/registry';

// The renderer decorator adds methods for rendering routes to both the DOM & to a <String>

@renderer
export default class App {

  constructor(defaultState = {}, dispatcher = new Dispatcher()) { 

    // Store primarily for client-side only state (validation, is-loading spinner). 
    // Relay store handles all state that persists to db.
    reg.set(REG.STORE, new Store(dispatcher, defaultState));
    reg.set(REG.DISPATCHER, dispatcher);

  }
}