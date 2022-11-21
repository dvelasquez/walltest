import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {
  compilerConfigBabel,
  htmlPluginConfig,
  sassConfig,
} from "./webpack.shared.config";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const babelConfig = compilerConfigBabel;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
babelConfig.use.options.plugins.push(require.resolve("react-refresh/babel"));

const config: Configuration = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: "./src/index.tsx",
  module: {
    rules: [compilerConfigBabel, sassConfig],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin(htmlPluginConfig),
    new MiniCssExtractPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    static: ["build", "public"],
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  },
};

export default config;
