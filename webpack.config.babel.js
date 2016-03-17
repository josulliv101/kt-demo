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

/*    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        include: __dirname + '/app',
        exclude: /bundle\.js$/
      }
    ],*/

    loaders: [
      {test: /\.js(x)?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
      {test: /\.json$/, loaders: ['json']},
      {
        test: /node_modules\/auth0-lock\/.*\.js$/,
        loaders: [
          'transform-loader/cacheable?brfs',
          'transform-loader/cacheable?packageify'
        ]
      }, {
        test: /node_modules\/auth0-lock\/.*\.ejs$/,
        loader: 'transform-loader/cacheable?ejsify'
      }
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
