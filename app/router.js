import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {} from 'isomorphic-relay'; // Load before "react-relay" to prevent "self is not defined"
import Relay from 'react-relay';
import App from './components/App';
import pgHome from './components/pg/Home';
import pgAbout from './components/pg/About';

var _user_id = null;

var appRoute = {
    path: '/',
    component: App,
    authUser: null,
    token: null,
    prepareParams: (params, route) => ({...params, user_id: _user_id }),
    queries: { viewer: () => Relay.QL`query { viewer(user_id: $user_id) }` },
    indexRoute: {
        component: pgHome
    },
    childRoutes: [
        {
            path: 'about',
            component: pgAbout,
        }
    ]
};

export default {
  getRoutes: (user_id, authData) => {
    _user_id = user_id;
    return [Object.assign(appRoute, authData)];
  }
}