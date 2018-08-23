const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const NodeExternals = require('webpack-node-externals')

module.exports = {
  name: 'server',
  mode: 'production',
  target: 'node',
  entry: {
    server: ['./src/server/index.js']
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/'
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
        test: /\.css$/,
        use: [
          { 
            loader: MiniCssExtractPlugin.loader
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
        use: [{ loader: 'pug-loader' }]
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname, '..'), 
      verbose: true 
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ]
}