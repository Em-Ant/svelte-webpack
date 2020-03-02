const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = mode => mode === 'development';
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/index.js',
  mode,
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-inline-loader',
          options: {
            removeSVGTagAttrs: false
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev(mode)
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.mjs', '.js', '.svelte'],
    modules: ['.', 'node_modules']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name]-[hash].bundle.js',
    chunkFilename: '[name]-[hash].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ],
  devtool: isDev(mode) ? 'eval.source-map' : false
};
