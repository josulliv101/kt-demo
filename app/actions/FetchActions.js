import {FETCH} from './const';
import {Dispatcher} from '../utils/registry';
import singleton from '../decorators/singleton';

@singleton
class FetchActions {

  status(fetching = false) {
	Dispatcher().dispatch({ actionType: FETCH.STATUS, update: fetching });
  }
}

export default FetchActions.getInstance
