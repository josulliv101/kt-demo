import path from 'path';
import webpack from 'webpack';

const env = process.env;

export default {
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
    new webpack.EnvironmentPlugin(Object.keys(env))
  ]
};
