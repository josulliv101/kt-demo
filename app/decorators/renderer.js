import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import {browserHistory as history} from 'react-router';

const {Router, RouterContext, prepareData} = IsomorphicRouter;

export default (targetClass) => {

  return class extends targetClass {

	  constructor({relayData = [], auth = null} = {}) {

	    super({auth});
		
	    Object.assign(this, { prepareData, relayData });
	  }
		
	  renderToDOM ({ el, routes, onReadyStateChange }) { 

	  	IsomorphicRelay.injectPreparedData(this.relayData);

	    ReactDOM.render(
	      <Router {...{routes, history, onReadyStateChange}} />, 
	      el
	    );
	  }

	  renderToString (renderProps) { 
	    return ReactDOMServer.renderToString(
	      <RouterContext {...renderProps} />
	    );
	  }
  };
}
