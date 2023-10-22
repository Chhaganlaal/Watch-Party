const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    index: "./src/index.tsx",
    watch_party_handler: "./src/handler/watch-party-handler.tsx",
    content_script: "./src/content-script.ts"
  },
  mode: "production",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            }
          }
        ]
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        exclude: /node_modules/,
        test: /\.svg$/,
        use: [
          {
            loader: "react-svg-loader",
            options: {
              jsx: true
            }
          },
          {
            loader: "babel-loader"
          }
        ]
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "manifest.json", to: "../manifest.json" },
      ],
    }),
    ...getHtmlPlugins(["index"]),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLPlugin({
        title: "Watch Party",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}