import IsomorphicRouter from 'isomorphic-relay-router';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Relay from 'react-relay';
import RelayStoreData from 'react-relay/lib/RelayStoreData';
import {match} from 'react-router';
import router from './router';

const GRAPHQL_URL = `http://localhost:3000/graphql`;
const {COOKIE_NAME} = process.env;

Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(GRAPHQL_URL));

RelayStoreData.getDefaultInstance().getChangeEmitter().injectBatchingStrategy(() => {});

export default (req, res, next) => {
    
    let routes = router.getRoutes({ token: req.cookies[COOKIE_NAME], authUser: req.user }),
        location = req.originalUrl;

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