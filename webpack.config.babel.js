import path from 'path';
import webpack from 'webpack';
//import ExtractTextPlugin from 'extract-text-webpack-plugin';

const env = process.env;

let configBrowser = {
  entry: {
    app: path.resolve('app/client.js')
  },
  output: {
    path: path.resolve('public/js'),
    filename: 'bundle.js',
    publicPath: '/js'
  },
  module: {
    loaders: [
      {test: /\.js(x)?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
      {test: /\.json$/, loaders: ['json']},
    ]
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.EnvironmentPlugin(Object.keys(env)),
    //new ExtractTextPlugin('[name].css')
  ]
};

export default [configBrowser];
