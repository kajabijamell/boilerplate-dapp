const path = require("path");
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_component s)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx"],
    alias: {
      process: "process/browser"
    },
    fallback: {
      'crypto': require.resolve("crypto-browserify"),
      'stream': require.resolve("stream-browserify"),
      'http': require.resolve("stream-http"),
      'https': require.resolve("https-browserify"),
      'os': require.resolve("os-browserify/browser")
    }
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    port: 3000,
    hot: true
  },
  plugins: [
    new webpack.ProvidePlugin({ process: 'process/browser' }),
    new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] })
  ],
};