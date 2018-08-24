const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const NodeExternals = require('webpack-node-externals')

module.exports = {
  name: 'server',
  mode: 'production',
  target: 'node',
  entry: './src/server/render.js',
  output: {
    filename: 'prod-server-bundle.js',
    path: path.resolve(__dirname, '../build'),
    libraryTarget: 'commonjs2'
  },
  externals: NodeExternals(),
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.css$/,
        use: [
          { 
            loader: ExtractCssChunks.loader
          },
          { 
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
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