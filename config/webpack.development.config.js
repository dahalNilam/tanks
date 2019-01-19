const webpack = require("webpack");
const path = require("path");

const webpackConfig = require("./webpack.config");

const newOptions = {
  devtool: "inline-source-map",
  plugins: [
    ...webpackConfig.plugins,
    new webpack.DefinePlugin({
      "process.env": {
        VERSION: JSON.stringify(require("../package.json").version),
        ENVIRONMENT: JSON.stringify("development"),
      },
    }),
  ],
};

module.exports = Object.assign({}, webpackConfig, newOptions);
