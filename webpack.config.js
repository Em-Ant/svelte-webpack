const path = require('path');
const { execSync } = require('child_process');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { version } = require('./package.json');

const getBuildTag = () => {
  const time = new Date().toISOString();
  try {
    const hash = execSync('git rev-parse --short HEAD')
      .toString()
      .replace('\n', '');
    return `${version}-${hash}:${time}`;
  } catch (e) {
    console.log(e);

    return `${version}:${time}`;
  }
};
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
      template: 'src/index.ejs',
      inject: 'body',
      hash: true,
      templateParameters: {
        build: getBuildTag()
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ],
  devtool: isDev(mode) ? 'eval.source-map' : false
};
