const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: ["./src/wpm.js", "./src/index.js"],
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