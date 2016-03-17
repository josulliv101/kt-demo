import {FETCH2} from './const';
import {Dispatcher} from '../utils/registry';
import singleton from '../decorators/singleton';

@singleton
class FetchActions {

  status(fetching = false) {
  	const update = { fetching };
	Dispatcher().dispatch({ actionType: FETCH2.STATUS, update: fetching });
  }
}

export default FetchActions.getInstance
