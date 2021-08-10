
const path = require('path');
const web = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
  },
  plugins: [
    new web.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
