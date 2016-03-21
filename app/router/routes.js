import IsomorphicRouter from 'isomorphic-relay-router'; // Included to avoid 'self not defined' error when using fetch on node
import {AppRoot, Home, Faq, Settings, SettingsHome} from '../components/pg/index';
import AppContainer from '../containers/AppContainer';
import ViewerQueries from '../queries/ViewerQueries';

export default ({user_id} = {}) => {
  
  // Included within exported function since on server there's multiple users with unique user ids.
  function requireAuth(nextState, replace, callback) {
    if (!user_id) { replace('/'); }
    callback();
  }

  return [{
    path: '/',
    component: AppContainer,
    indexRoute: {
        component: Home,
        queries: ViewerQueries,
    },
    childRoutes: [
      {
        path: 'faq',
        breadcrumb: 'faq',
        component: Faq,
      },
      {
        // Private. Authentication required.
        onEnter: requireAuth,
        childRoutes: [
          {
            path: 'settings',
            breadcrumb: 'settings',
            component: Settings,
            indexRoute: {
              component: SettingsHome,
              queries: {user: () => Relay.QL`query { user(user_id: $user_id) }`},
              prepareParams: (params, route) => ({...params, user_id: user_id }),
            },
            childRoutes: [
              {
                path: 'faq',
                breadcrumb: 'faq',
                component: Faq,
              },
            ]
          },
        ]
      },
    ]
  }]
}