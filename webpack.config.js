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
const isDev = (mode) => mode === 'development';
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/index.js',
  mode,
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader-hot',
          options: {
            dev: isDev,
            hotReload: true,
            hotOptions: {
              // whether to preserve local state (i.e. any `let` variable) or
              // only public props (i.e. `export let ...`)
              noPreserveState: false,
              // optimistic will try to recover from runtime errors happening
              // during component init. This goes funky when your components are
              // not pure enough.
              optimistic: true,

              // See docs of svelte-loader-hot for all available options:
              //
              // https://github.com/rixo/svelte-loader-hot#usage
            },
          },
        },
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-inline-loader',
          options: {
            removeSVGTagAttrs: false,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.svelte'],
    modules: ['.', 'node_modules'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: isDev(mode) ? '/' : './',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: 'body',
      hash: true,
      templateParameters: {
        build: getBuildTag(),
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  devtool: isDev(mode) ? 'eval-source-map' : false,
  devServer: {
    hot: true,
  },
};
