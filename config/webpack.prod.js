const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    main: ['./src/main.js']
  },
  mode: 'production',
  output: {
    filename: '[name]-[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { 
            loader: 'babel-loader',
            options: {
              plugins: ['react-hot-loader/babel']
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: [
          { 
            loader: 'awesome-typescript-loader'
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' }
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
        test: /\.pug$/,
        use: [
          { loader: 'pug-loader' }
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
      }
    ]
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'
    }),
    new HTMLWebpackPlugin({
      template: './src/index.pug',
      chunks: ['vendor', 'main']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new MinifyPlugin(),
    new CompressionPlugin({
        algorithm: "gzip"
      }),
    new BrotliPlugin()
  ]
}