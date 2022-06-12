const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const Dotenv = require("dotenv-webpack");
let mode = process.env.NODE_ENV ? "production" : "development";

module.exports = {
  mode: mode,
  entry: {
    bundle: path.resolve(__dirname, "src/index.tsx"),
    ServiceWorker: path.resolve(__dirname, "serviceWorker.js"),
  },
  output: {
    path: path.resolve(__dirname, "../server/build/public"),
    filename: "./[name].js",
    clean: true,
    assetModuleFilename: "images/[name][ext][query]",
    publicPath: "/",
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
    },
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  performance: {
    hints: mode === "development" && false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]|c)ss/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      title: "Personal Finance",
      favicon: "./src/resources/icons/Logo.svg",
    }),
    new Dotenv({
      path: "./.env",
    }),
    new WebpackPwaManifest({
      filename: "manifest.json",
      name: "Personal Finance",
      short_name: "PF",
      description: "Attempt to make a Personal Finance app with React",
      start_url: "https://www.marglipersonalfinance.me",
      background_color: "#ffffff",
      theme_color: "#eeeeee",
      display: "standalone",
      icons: [
        {
          src: path.resolve("src/resources/icons/Logo.svg"),
          sizes: [96, 128, 192, 256, 512],
          purpose: "any maskable",
        },
        {
          src: path.resolve("src/resources/icons/Logo.png"),
          sizes: [512],
          purpose: "any maskable",
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".js"],
  },
};
