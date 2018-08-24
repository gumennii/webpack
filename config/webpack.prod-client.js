const path = require('path')
const webpack = require('webpack')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  name: 'client',
  mode: 'production',
  entry: {
    vendors: ['react', 'react-dom'],
    main: ['./src/index.js']
  },
  output: {
    filename: '[name]-bundle.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  optimization: {
    runtimeChunk: {
      name: 'bootstrap'
    },
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/
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
          { loader: ExtractCssChunks.loader },
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
            options: { name: 'images/[name].[ext]' }
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
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new OptimizeCssAssetsPlugin(),
    new UglifyJsPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip'
    }),
    new BrotliPlugin()
  ]
}