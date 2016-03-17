import {NOTIFY2} from './const';
import {Store, Dispatcher} from '../utils/registry';
import singleton from '../decorators/singleton';

@singleton
class NotifyActions {

  show({ message = '', key = new Date().getTime(), dismissAfter = 3000, style = {} }) { 

  	const {notifications} = Store().state;
	
	// TODO: Support multiple, stacked notifications

	// Cancel action if there's already a notification showing.
  	if (notifications.length > 0) return;

	Dispatcher().dispatch({ 
		actionType: NOTIFY2.SHOW, 
		update: {message, key, dismissAfter, style} 
	});
  }

  clear() { 
	Dispatcher().dispatch({ actionType: NOTIFY2.CLEAR });
  }
}

export default NotifyActions.getInstance;
