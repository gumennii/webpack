const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  name: 'client',
  mode: 'development',
  entry: {
    vendors: ['react', 'react-dom'],
    main: [
      'react-hot-loader/patch',
      'babel-runtime/regenerator',
      'webpack-hot-middleware/client?reload=true',
      './src/index.js'
    ]
  },
  output: {
    filename: '[name]-bundle.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: 'dist',
    hot: true,
    stats: {
      colors: true
    }
  },
  devtool: 'source-map',
  optimization: {
    runtimeChunk: {
      name: 'bootstrap'
    },
    splitChunks: {
      chunks: 'initial',
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
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/,
        use: [
          { loader: ExtractCssChunks.loader },
          { 
            loader: 'css-loader',
            options: { modules: true }
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
    new ExtractCssChunks({ hot: true }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}