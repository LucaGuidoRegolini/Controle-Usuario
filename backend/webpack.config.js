const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const { NODE_ENV = "production" } = process.env;

console.log(NODE_ENV);

module.exports = {
  entry: "./src/server.ts",
  mode: "development",
  watch: NODE_ENV === "development",
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 500,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
  target: "node",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: [nodeExternals()],
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: [
          NODE_ENV === "development"
            ? "nodemon -L build/bundle.js"
            : "node build/bundle.js",
        ],
        blocking: false,
        parallel: true,
      },
    }),
  ],
};
