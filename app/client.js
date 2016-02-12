import { browserHistory } from 'react-router';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOM from 'react-dom';
import router from './router';


const data = JSON.parse(document.getElementById('preloadedData').textContent);
var id = (data[0].result.viewer.user && data[0].result.viewer.user.user_id) || (data[1].result.viewer.user && data[1].result.viewer.user.user_id);

console.log('preload data', id, data);
// TODO meat of the data is not in consistent index
var routes = router.getRoutes(id, null);

console.log('routes', routes);
IsomorphicRelay.injectPreparedData(data);

ReactDOM.render(
    <IsomorphicRouter.Router routes={routes} history={browserHistory} />,
    document.getElementById('app')
);

