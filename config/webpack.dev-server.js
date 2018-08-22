const path = require('path')
const webpack = require('webpack')
const externals = require('./node-externals')

module.exports = {
  name: 'server',
  target: 'node',
  externals: externals,
  entry: './src/server/render.js',
  output: {
    filename: 'dev-server-bundle.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../build'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{ loader: 'awesome-typescript-loader' }],
      },
      {
        test: /\.css$/,
        use: [
          { 
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          { 
            loader: 'html-loader',
            options: {
              attrs: ['img:src'] 
            }
          }
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
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
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}