import BaseApp from './BaseApp';
import registry from './utils/registry';
import {FetchActions} from './actions';

/*
 * @class App
 *
 * The Kindturle app only references actions specific to this application.
 *
 */

class App extends BaseApp {

  /*
   * @constructs App
   * @param {Object} options
   */
  constructor() { 
    
    super({
      onReadyStateChange: (obj) => {
        var actionsFetch = registry.get('FetchActions')();
        console.log('onReadyStateChange', obj.ready);
        !obj.ready ?  actionsFetch.start() : actionsFetch.stop();
      }
    }); // { el, state }

    //console.log('APP', el, state);

    registry.set("FetchActions", new FetchActions());
    //registry.set("API", new API());
    //registry.set("Routes", Routes); // Module exports a function

  }

}

export default App;
