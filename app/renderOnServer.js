import IsomorphicRouter from 'isomorphic-relay-router';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Relay from 'react-relay';
import RelayStoreData from 'react-relay/lib/RelayStoreData';
import {match} from 'react-router';
import router from './router';
import auth from '../server/authentication';
import CreateNewUserMutation from './mutations/CreateNewUserMutation';

const {COOKIE_NAME, GRAPHQL_URL} = process.env;

Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(GRAPHQL_URL));

RelayStoreData.getDefaultInstance().getChangeEmitter().injectBatchingStrategy(() => {});

export default (req, res, next) => {
    
    let token = req.cookies[COOKIE_NAME],
        user_id = req.user && req.user.user_id || null,
        routes = router.getRoutes(user_id, { token, authUser: req.user }),
        location = req.originalUrl;
    
    // TODO: make sure token is val && (!token || token == '')
/*    if (auth.isNewUser(req.user)) {

        var [fname, lname] = req.user.name.split(' '), email = '';
        
        // TODO: async, need to wait to call match()
        Relay.Store.update(new CreateNewUserMutation({fname, lname, email}), {
          onSuccess: (res2) => auth.handleNewUser(req.user.user_id),
          onFailure: (res2) => console.log('Relay.Store.update fail')
        });
    }*/

    match({ routes, location }, (error, redirectLocation, renderProps) => {

        if (error) {
            next(error);
        } 

        else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } 

        else if (renderProps) {
            IsomorphicRouter.prepareData(renderProps).then(render, next);
        } 

        else {
            res.status(404).send('Not Found');
        }

        function render(data) {
            const reactOutput = ReactDOMServer.renderToString(
                <IsomorphicRouter.RouterContext {...renderProps} />
            );
            res.render(path.resolve(__dirname, '..', 'views', 'index.ejs'), {
                preloadedData: JSON.stringify(renderProps),
                reactOutput
            });
        }
    });
};
