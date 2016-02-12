import { browserHistory } from 'react-router';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOM from 'react-dom';

/*import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import Relay from 'react-relay';

import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';*/

//import {createHistory} from 'history';
import router from './router';


//let history = createHistory();

/*Relay.injectNetworkLayer(
	new Relay.DefaultNetworkLayer('http://localhost:3000/graphql', {
		headers: {
			//Authorization: 'Bearer ' + token1
		}
	})
);*/

const data = JSON.parse(document.getElementById('preloadedData').textContent);
console.log('preload data', data);
// TODO meat of the data is not in consistent index
let routes = router.getRoutes((data[0].result.viewer.user && data[0].result.viewer.user.user_id) || (data[1].result.viewer.user && data[1].result.viewer.user.user_id), null);
 
console.log('routes', routes);
IsomorphicRelay.injectPreparedData(data);

ReactDOM.render(
    <IsomorphicRouter.Router routes={routes} history={browserHistory} />,
    document.getElementById('app')
);

