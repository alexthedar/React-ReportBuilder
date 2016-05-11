const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  // style: path.join(__dirname, 'app/main.css'),
  library: path.join(__dirname, 'build/bundles'),
  select: path.join(__dirname, 'app/select.jsx'),
  display: path.join(__dirname, 'app/display.jsx')
};

const common = {
  entry: {
    select: PATHS.select,
    display: PATHS.display
    // app: PATHS.app,
    // style: PATHS.style
  },
  resolve: {
    extensions: ['','.js','.jsx']
  },
  output: {
    // path: PATHS.build,
    // filename: "bundle.js"
   path: PATHS.library,
    filename: 'bundle.[name].js',
    library: ['Bundles', '[name]'],
  //   libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      }
    ]
  }
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true
      })
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {});
}
