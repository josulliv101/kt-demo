import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import assign from 'react/lib/Object.assign';
import registry from './utils/registry';
import Flux from 'flux';
import Store from './stores/StateStore';

import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';

import router from './router';

/*
 * @class App
 *
 * The App is a container to hold a store, actions, routing, and dispatcher.
 * It is the entry point to rerendering the app in response to state change.
 *
 */

class BaseApp {

  /*
   * @constructs App
   * @param {Object} options
   */
  constructor(attrs) { 
    
    var dispatcher = new Flux.Dispatcher();
    assign(this, attrs);

    registry.set("Dispatcher", dispatcher);
    registry.set("Store", new Store(dispatcher, {/* non-persistent state only (ajax loading, client-side validation, drag-drop, etc) */}));

        //appRouter = new AppRouter({store});
/*
    assign(this, { appRouter });
    
    // Register the needed actions, stores, apis & dispatcher
    registry.set("Dispatcher", dispatcher);
    registry.set("Store", store);

    // Rerender app whenever the state changes
    store.structure.on('swap', this.render.bind(this, el));
*/
  }

 /*
  * @method render
  * @param {DOM} [element]
  * @returns {String|undefined}
  */
/*  render (el, newStructure, oldStructure, arg) { debug('render()', el);
    let routes = this.appRouter.routes();
    return el ? renderDOM(routes, el) : server.renderToString(this.appRouter)
  }*/

  createElement (authenticated, Component, props) { //debug('createElement()');
    console.log('createElement', authenticated);
    //var { payload = ()=>{} } = props.route;
    //var payload = payload(props, this.store.structure);
    
    // IMPORTANT! Very top-level deals initially with references, but cursors get passed down component tree.

    // Convert references to cursors here so that latest information gets passed down component tree.
    // Cursors can't be passed in initially because changes in the store would not be reflected.
    // References cannot be passed down the component tree because it would throw off the shouldComponentUpdate check.
    // Don't want to convert to JSON objects so that shouldComponentUpdate will be faster when comparing immutable data.
    //payload = _.reduce(payload, (result, n, key) => { result[key] = payload[key].cursor && payload[key].cursor() || payload[key]; return result; }, {});

    // TODO: Add auth data here?
    return <Component {...props} authenticated={authenticated} /> //children={props.children} {...payload}
  }

 /*
  * @method render
  * @param {DOM} element
  */
  renderToDOM (el, state) { //debug('renderToDOM()');
    
    var id = (state[0].result.viewer.user && state[0].result.viewer.user.user_id) || (state[1].result.viewer.user && state[1].result.viewer.user.user_id);

    var routes = router.getRoutes(id, null);

    IsomorphicRelay.injectPreparedData(state);

    ReactDOM.render(<IsomorphicRouter.Router 
      foo='bar' 
      routes={routes} 
      history={browserHistory} 
      onReadyStateChange={this.onReadyStateChange}
      createElement={this.createElement.bind(this, !!id && id !== '-1')} // Makes select props available to all controller views
    />, el);
    // onReadyStateChange={onReady}

  }/**/

  /*
   * @method renderToString
   * @returns {String}
   */
/*  renderToString () { debug('renderToString()');

    return this.render();
    
  }*/

}

export default BaseApp;
