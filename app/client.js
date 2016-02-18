import App from './App';

const state = JSON.parse(document.getElementById('preloadedData').textContent);

var app = new App();
app.renderToDOM(document.getElementById('app'), state);