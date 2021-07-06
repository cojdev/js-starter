const path = require('path');

const distPath = 'dist/js';
const srcPath = 'src/js';

module.exports = {
  entry: `./${srcPath}/index.js`,

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, distPath),
    publicPath: '/js',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
};
