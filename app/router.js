import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {} from 'isomorphic-relay'; // Load before "react-relay" to prevent "self is not defined"
import Relay from 'react-relay';
import App from './components/App';
import pgHome from './components/pg/Home';
import pgAbout from './components/pg/About';
import pgCampaigns from './components/pg/Campaigns';
import pgCampaignCreate from './components/pg/CampaignCreate';

import ViewerQueries from './queries/ViewerQueries';

var _user_id = null;

var appRoute = {
    path: '/',
    component: App,
    breadcrumb: 'kindturtle',
    user_id: _user_id, // Make available in preloadedData on client
    prepareParams: (params, route) => ({...params, user_id: _user_id }),
    queries: {viewer: () => Relay.QL`query { viewer(user_id: $user_id) }`},
    indexRoute: {
        component: pgHome
    },
    childRoutes: [
        {
            path: 'about',
            breadcrumb: 'about',
            component: pgAbout,
            user_id: _user_id, // Make available in preloadedData on client
            prepareParams: (params, route) => ({...params, user_id: _user_id }),
            queries: {viewer: () => Relay.QL`query { viewer(user_id: $user_id) }`}
        },
        {
            path: 'campaigns',
            breadcrumb: 'campaigns',
            component: pgCampaigns,
            user_id: _user_id, // Make available in preloadedData on client
            prepareParams: (params, route) => ({...params, user_id: _user_id }),
            queries: {viewer: () => Relay.QL`query { viewer(user_id: $user_id) }`}
        },
        {
            path: 'campaign/create',
            breadcrumb: 'create a campaign',
            component: pgCampaignCreate,
            onEnter: requireAuth,
            user_id: _user_id, // Make available in preloadedData on client
            prepareParams: (params, route) => ({...params, user_id: _user_id }),
            queries: {viewer: () => Relay.QL`query { viewer(user_id: $user_id) }`}
        }
    ]
};

function requireAuth(nextState, replace, callback) {
    console.log('isAuthenticated', nextState, nextState.routes[0].user_id);
    if (!nextState.routes[0].user_id || nextState.routes[0].user_id === '-1') {
        replace('/about');
    }
    callback();
}

export default {
  getRoutes: (user_id, token) => {
    _user_id = user_id;
    appRoute.user_id = user_id;

    return [appRoute];
  }
}