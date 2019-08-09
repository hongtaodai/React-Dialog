const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: "development",
  // entry: './demo/app.js',
  /*入口*/
  entry: [
    path.join(__dirname, 'src/index.js'),
  ],

  /*输出到dist文件夹，输出文件名字为bundle.js*/
  output: {
      path: path.join(__dirname, './dist'),
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
          test: /\.(png|jpg|gif|eot|svg|ttf|woff|otf)$/,
          use: [
              {
                  loader: 'url-loader',
                  options: {
                      limit: 12288
                  }
              }
          ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
      }, {
          loader: "css-loader" // translates CSS into CommonJS
      }, {
          loader: "less-loader" // compiles Less to CSS
      }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html')
    })
  ]
};
