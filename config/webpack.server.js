const path = require('path')
const webpack = require('webpack')
const NodeExternals = require('webpack-node-externals')

module.exports = env => {
  return {
    target: 'node',
    externals: NodeExternals(),
    entry: {
      server: ['./src/server/main.js']
    },
    mode: 'development',
    output: {
      filename: '[name]-bundle.js',
      path: path.resolve(__dirname, '../build'),
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
            { loader: 'css-loader' }
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
                name: 'images/[name].[ext]',
                emitFile: false
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.NODE_ENV)
        }
      })
    ]
  }
}