import App from './App';
import {routes} from './router/';
import DOM from './utils/DomUtils';
import {FetchActions as Fetch} from './actions';

const data = DOM.getData('preloadedData');

new App(data).renderToDOM({

	routes,
	el: document.getElementById('app'),

	// Optional handler for Relay's onReadyStateChange
	onReadyStateChange: (status) => Fetch().status(!status.ready) 

});
