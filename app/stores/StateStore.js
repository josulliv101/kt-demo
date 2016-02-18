import {EventEmitter} from 'events';
import Immutable from 'immutable';
import immstruct from 'immstruct';
import Debug from 'debug';
import _ from 'lodash';

import {CHANGE, STORE, FETCH} from '../actions/const';

var debug = Debug('Store');
 
/*
 * @class Store
 */
class StateStore extends EventEmitter {

  /*
   * @constructs Store
   * @extends events.EventEmitter
   * @param {Object} dispatcher
   * @param {Object} [state]
   */
  constructor (dispatcher, state = {}) { debug('constructor()', arguments);

    super();

    if (!dispatcher) debug(new Error('Store: dispatcher is required'));

    state = _.merge({}, StateStore.defaults, state);

    // Register handlers
    dispatcher.register(action => {

      if (action.actionType === FETCH.START || action.actionType === FETCH.STOP ) {
        this.onMerge(action);
        this.emit(CHANGE);

        console.log('STORE::fetching', this.getState().fetching);
      }      

    });

    // Turn state to immutable
    this.structure = immstruct('app', state);

  }


  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }

  /*
   * @method state
   * @returns {Immutable.Map} - state
   */
  getState () {
    return this.structure.cursor().toJS();
  }

  onMerge({update, actionType}) { debug('onMerge', actionType);

    let state = this.getState();
    
    //if (update.lists && update.lists.widgetStream) update.lists.widgetStream = _.unique(state.lists.widgetStream.concat(update.lists.widgetStream));

    update = _.merge(state, update);
    this.structure.cursor().merge(update);
    
  }

}

// Default state. These can be overridden by passing in obj when app is created.
StateStore.defaults= {
  causes: {},
  causeList: [],
  profiles: {},
  users: {},
  widgets: {},
  lists: {
    widgetStream: []
  },
  auth: {
    user: null
  },
  fetching: false,
  validation: {},
  loading: {
    app: false,
    widgetStream: false
  },
  defaults: {
    widgetStream: {
      size: 10
    },
    loading: {
      opacity: .44
    }
  }
};

export default StateStore;
