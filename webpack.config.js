const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

// не подключен и не настроен babel и typeScript... ну и прочее продвинутое

// для создания дев мода в консоль ввести, на Windows:
// $env:NODE_ENV="production" - сейчас записывается автоматически при вызове скриптов npm
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./index.js",
    // private: true,
    analytics: "./analytics.js",
  },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
    open: {
      app: ["firefox"],
    },
  },
  devtool: isDev ? "source-map" : undefined,
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     // для копирования конкретных файлов
    //     // from: path.resolve(__dirname, ""),
    //     // to: path.resolve(__dirname, "dist"),
    //   },
    // ]),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          // "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png, svg, jpg, gif)/,
        use: ["file-lodaer"],
      },
      {
        test: /\.xml$/,
        use: "xml-loader",
      },
    ],
  },
};
