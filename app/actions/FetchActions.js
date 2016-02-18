import {FETCH} from './const';
import registry from '../utils/registry';
var dispatcher = registry.get('Dispatcher');

/*
 * @class Fetch Actions
 */
class FetchActions {
  
  start(update = {fetching: true}) { 
	console.log('Fetch Actions', FETCH.START);
	dispatcher().dispatch({ actionType: FETCH.START, update });
  }

  stop(update = {fetching: false}) { 
	console.log('Fetch Actions', FETCH.STOP);
	dispatcher().dispatch({ actionType: FETCH.STOP, update });
  }
}

export default FetchActions;
