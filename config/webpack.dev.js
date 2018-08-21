const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: [
      'babel-runtime/regenerator',
      'babel-register',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      './src/main.js'
    ],
    ts: ['./src/index.ts']
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: 'dist',
    hot: true
  },
  devtool: 'source-map',
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
          { loader: 'style-loader' },
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
        use: [
          { loader: 'pug-loader' }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.pug'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}