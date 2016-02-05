import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {} from 'isomorphic-relay'; // Load before "react-relay" to prevent "self is not defined"
import Relay from 'react-relay';
import App from './components/App';
import pgHome from './components/pg/Home';

var appRoute = {
    path: '/',
    component: App,
    authUser: null,
    token: null,
    //prepareParams: (params, route) => ({...params, token: _token}),
    queries: { viewer: () => Relay.QL`query { viewer }` },
    indexRoute: {
        component: pgHome
    }
};

export default {
  getRoutes: (authData) => [Object.assign(appRoute, authData)]
}