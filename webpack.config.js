var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["./src/main.ts"],
  devtool: "source-map",
  resolve: {
    extensions: ["*", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(s(a|c)ss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            // Interprets CSS
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)?(\?[a-z0-9#=&.]+)?$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[contenthash][ext]",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/styles.css",
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "assets/js/bundle.min.js",
    libraryTarget: "window",
    clean: true,
  },
};
