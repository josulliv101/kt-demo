import {routes} from '../app/router/'; // Needed to include before Relay. It's reference to IsomorphicRouter fixes fetch issue on nodejs.
import Relay from 'react-relay';
import {match} from 'react-router';
import RelayStoreData from 'react-relay/lib/RelayStoreData';
import path from 'path';
import App from '../app/App';

const {COOKIE_NAME, GRAPHQL_URL, STATIC_ASSETS_URL} = process.env;

Relay.injectNetworkLayer( new Relay.DefaultNetworkLayer(GRAPHQL_URL) );
RelayStoreData.getDefaultInstance().getChangeEmitter().injectBatchingStrategy(() => {});

export default (req, res, next) => {
    
    match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {

        var authData = { auth: req.user || null }, // Set to null to preserve in json.stringify.
              app = new App({authData});
        console.log('authData', authData);
        if (error) {
          next(error);
        } else if (redirectLocation) { 
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
          app.prepareData(renderProps).then(render, next);
        } else {
          res.status(404).send('Not Found');
        }

        function render(data) {

            try {

              app.renderToString(renderProps);
              
              res.render(path.resolve(__dirname, '..', 'views', 'index.ejs'), {
                  preloadedData: JSON.stringify({ relayData: data, authData }),
                  assets_url: STATIC_ASSETS_URL,
                  reactOutput: app.renderToString(renderProps)
              });
            } 

            catch(e) { console.log(e) }

        }

    });
};
