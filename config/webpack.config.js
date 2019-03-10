const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

const BASE_DIRECTORY = path.resolve(__dirname, "..");

module.exports = {
  entry: {
    main: [path.resolve(BASE_DIRECTORY, "src", "index.tsx")]
  },
  output: {
    path: path.resolve("dist"),
    filename: "js/[name].bundle.js"
  },
  context: BASE_DIRECTORY,
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: [path.resolve(BASE_DIRECTORY, "src"), "node_modules"],
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: "babel-loader?cacheDirectory",
        query: {
          cacheDirectory: true
        },
        exclude: /node_modules/
      },
      {
        test: /.(ts|tsx)$/,
        loader: [
          {
            loader: "babel-loader",
            query: {
              cacheDirectory: true
            }
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.(png|jpg)$/,
        use: "file-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.(png|jpg)$/,
        use: "url-loader"
      },
      {
        test: /\.worker\.js?$/,
        use: "worker-loader",
        exclude: /node_modules/
      }
    ]
  },
  stats: {
    // suppress "export not found" warnings about re-exported types
    warningsFilter: /export .* was not found in/
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          enforce: true,
          chunks: "all"
        },
        components: {
          test: /[\\/]src[\\/]/,
          name: "components",
          enforce: true,
          chunks: "all",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(BASE_DIRECTORY, "public", "index.html"),
      inject: true
    }),

    new CleanWebpackPlugin(["dist"], {
      root: BASE_DIRECTORY
    }),

    new webpack.DefinePlugin({
      "process.env": {
        VERSION: JSON.stringify(
          require(path.resolve(BASE_DIRECTORY, "package.json")).version
        )
      }
    }),

    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      colors: true
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new CopyWebpackPlugin([
      {
        from: `${BASE_DIRECTORY}/public/*\.!(html)`,
        to: path.resolve(BASE_DIRECTORY, "dist"),
        flatten: true
      }
    ])
  ]
};
