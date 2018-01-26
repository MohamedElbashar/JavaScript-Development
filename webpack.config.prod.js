import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor:path.resolve(__dirname,'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor'
    }),
    //create html file that include reference to bundled JS.
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify:{
          removeComments:true,
          collapseWhitespace:true,
          removeRedundantAttributes:true,
          useShortDoctype:true,
          removeEmptyAttributes:true,
          removeStyleLinkTypeAttributes:true,
          keepClosingSlash: true,
          minifyJS:true,
          minifyCSS:true,
          minifyURLs:true
        },
        inject: true,
        trackJSToken:"748f46a449e243a18ccc1c0d1eeb69e4"
    }),
    new webpack.optimize.DedupePlugin(),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/,loader:ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
