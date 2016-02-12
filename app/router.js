import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {} from 'isomorphic-relay'; // Load before "react-relay" to prevent "self is not defined"
import Relay from 'react-relay';
import App from './components/App';
import pgHome from './components/pg/Home';
import pgAbout from './components/pg/About';
import ViewerQueries from './queries/ViewerQueries';

var _user_id = null;

var appRoute = {
    path: '/',
    component: App,
    user_id: _user_id, // Make available in preloadedData on client
    prepareParams: (params, route) => ({...params, user_id: _user_id }),
    queries: ViewerQueries,
    indexRoute: {
        component: pgHome,
        user_id: _user_id, // Make available in preloadedData on client
        prepareParams: (params, route) => ({...params, user_id: _user_id }),
        queries: ViewerQueries,
    },
    childRoutes: [
        {
            path: 'about',
            component: pgAbout,
            user_id: _user_id, // Make available in preloadedData on client
            prepareParams: (params, route) => ({...params, user_id: _user_id }),
            queries: ViewerQueries,
        }
    ]
};

export default {
  getRoutes: (user_id, token) => {
    _user_id = user_id;
    appRoute.user_id = user_id;
    return [appRoute];
  }
}