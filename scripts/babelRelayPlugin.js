var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../data/schema.json');
console.log('******************************');
module.exports = getbabelRelayPlugin(schema.data);