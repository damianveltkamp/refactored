const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
const OptimizeCssAssetsPlugin = require ('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

const parsePath = path.parse(__filename);
module.exports = {
  mode: 'production',
  devtool: 'eval',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name]-[contentHash].bundle.js',
    path: parsePath.dir + '/static/bundle'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'postcss-loader',
          'sass-loader'
        ]
      },
    ]
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer()
        ]
      }
    }),
    new ManifestPlugin(),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'static/service-worker.js'),
      filename: 'service-worker.js',
      includes: ['*.css', '*.js']
    }),
  ]
}
