import App from './App';
import {routes} from './router/';
import DOM from './utils/DomUtils';
import {FetchActions} from './actions';

const state = DOM.getData('preloadedData');

new App(state).renderToDOM({

	routes: routes(state.auth),
	el: document.getElementById('app'),

	// Handler for Relay's onReadyStateChange (controls loading indicator)
	onReadyStateChange: (status) => FetchActions().status(!status.ready) 

});
