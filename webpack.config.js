const path = require('path');

const distPath = 'dist/js';
const srcPath = 'src/js';

module.exports = {
  entry: `./${srcPath}/index.js`,

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, distPath),
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
