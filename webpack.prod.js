const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: "production",
  entry: [
    path.join(__dirname, 'src/ReactDialog.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ReactDialog.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: 'react',
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
              loader: "style-loader" // creates style nodes from JS strings
              }, {
                  loader: "css-loader" // translates CSS into CommonJS
              }, 
              {
                  loader: "less-loader" // compiles Less to CSS
            }]
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
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
};