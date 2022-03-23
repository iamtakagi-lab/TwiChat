import * as path from "path";
import nodeExternals from "webpack-node-externals";
const isProduction = process.env.NODE_ENV === "production";

const webConfig = {
  mode: isProduction ? "production" : "development",
  entry: {
    main: "./src/client/index.tsx",
  },
  target: ["web", "es5"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                "@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"
            ],
            plugins: ["@babel/plugin-syntax-jsx", "@babel/plugin-transform-runtime"]
          }
        },
      }
    ],
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
};

const serverConfig = {
  mode: isProduction ? "production" : "development",
  target: "node",
  externals: [nodeExternals()],
  entry: {
    main: "./src/server/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "server"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
};

module.exports = [webConfig, serverConfig];