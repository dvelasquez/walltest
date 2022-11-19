import MiniCssExtractPlugin from "mini-css-extract-plugin";
export const htmlPluginConfig = {
  template: "src/index.html",
  favicon: "public/favicon.ico",
  xhtml: true,
  base: "/",
};

export const compilerConfigBabel = {
  test: /\.(ts|js)x?$/i,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
      plugins: [require.resolve("react-refresh/babel")],
    },
  },
};

export const sassConfig = {
  test: /\.s[ac]ss$/,
  use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
};
