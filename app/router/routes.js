import IsomorphicRouter from 'isomorphic-relay-router'; // Included to avoid 'self not defined' error when using fetch on node
import {AppRoot, Home, Faq, Settings} from '../components/pg/index';
import ViewerQueries from '../queries/ViewerQueries';

/*function requireAuth(nextState, replace, callback) {
    console.log('isAuthenticated', nextState, nextState.routes[0].user_id);
    if (!nextState.routes[0].user_id || nextState.routes[0].user_id === '-1') {
        replace('/about');
    }
    callback();
}*/

export default [{
    path: '/',
    component: AppRoot,
    //prepareParams: (params, route) => ({...params, user_id: "facebook|211883462492448" }),
    //queries: ViewerQueries,
    indexRoute: {
        component: Home,
        queries: ViewerQueries,
        prepareParams: (params, route) => ({...params, user_id: "" }),
    },
    childRoutes: [
        {
            path: 'faq',
            breadcrumb: 'faq',
            component: Faq,
            //queries: ViewerQueries
        },
    ]
}]