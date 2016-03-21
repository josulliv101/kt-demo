import App from './App';
import {routes} from './router/';
import DOM from './utils/DomUtils';
import {FetchActions} from './actions';

const data = DOM.getData('preloadedData');

new App(data).renderToDOM({

	routes: routes(data.auth),
	el: document.getElementById('app'),

	// Optional handler for Relay's onReadyStateChange (controls loading indicator)
	onReadyStateChange: (status) => FetchActions().status(!status.ready) 

});
