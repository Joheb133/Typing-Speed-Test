const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: ["./src/index.js", "./src/wpm.js"],
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/test.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}