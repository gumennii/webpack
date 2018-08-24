const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const NodeExternals = require('./node-externals')

module.exports = {
  name: 'server',
  mode: 'production',
  target: 'node',
  entry: './src/server/render.js',
  output: {
    filename: 'dev-server-bundle.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../build'),
    libraryTarget: 'commonjs2'
  },
  externals: NodeExternals,
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.css$/,
        use: [ExtractCssChunks.loader, 'css-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'images/[name].[ext]', emitFile: false }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [{ loader: 'pug-loader' }]
      }
    ]
  },
  plugins: [
    new ExtractCssChunks(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ]
}